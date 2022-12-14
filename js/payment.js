const totalPaymentAmount = JSON.parse(localStorage.getItem('totalPay'));
const amount = totalPaymentAmount['totalAmount'];
console.log(amount);

// for dom changing
const totalCheckoutContainer = document.querySelector('#totalCheckout');
totalCheckoutContainer.textContent = amount.toFixed(2);

// for localstorage shipping addres
const addBtn = document.querySelector('#saveShipDetail');
const email = document.querySelector('#checkoutEmail');
const phone = document.querySelector('#checkoutPhone');
const address = document.querySelector('#checkoutAddress');

let localShipDetail = JSON.parse(
  localStorage.getItem('shippingCustomerDetails')
);
let shipDetail = [...localShipDetail] || [];

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const obj = {
    email: email.value,
    phone: phone.value,
    address: address.value,
  };

  shipDetail.push(obj);

  localStorage.setItem('shippingCustomerDetails', JSON.stringify(shipDetail));
});

// for paypa

const fundingSources = [paypal.FUNDING.PAYPAL];

for (const fundingSource of fundingSources) {
  const paypalButtonsComponent = paypal.Buttons({
    fundingSource: fundingSource,

    // optional styling for buttons
    // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
    style: {
      shape: 'rect',
      height: 40,
    },

    // set up the transaction
    createOrder: (data, actions) => {
      // pass in any options from the v2 orders create call:
      // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
      const createOrderPayload = {
        purchase_units: [
          {
            amount: {
              value: `${amount}`,
            },
          },
        ],
      };

      return actions.order.create(createOrderPayload);
    },

    // finalize the transaction
    onApprove: (data, actions) => {
      const captureOrderHandler = (details) => {
        const payerName = details.payer.name.given_name;
        console.log('Transaction completed!');
      };

      return actions.order.capture().then(captureOrderHandler);
    },

    // handle unrecoverable errors
    onError: (err) => {
      console.error(
        'An error prevented the buyer from checking out with PayPal'
      );
    },
  });

  if (paypalButtonsComponent.isEligible()) {
    paypalButtonsComponent.render('#paypal-button-container').catch((err) => {
      console.error('PayPal Buttons failed to render');
    });
  } else {
    console.log('The funding source is ineligible');
  }
}
