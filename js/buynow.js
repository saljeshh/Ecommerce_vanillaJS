const buynowItem = JSON.parse(localStorage.getItem('buynowProduct'));
const buyprice = buynowItem['price'];
const discountPercent = buynowItem['discountPercent'];
const subPrice = buyprice - (buyprice * buynowItem['discountPercent']) / 100;
const vatAddedPrice = subPrice + (subPrice * 13) / 100;
const Total = vatAddedPrice + 120;
console.log(Total);

const totalCheckoutContainer = document.querySelector('#totalbuynow');

totalCheckoutContainer.textContent = Total;

// shipping details

// for localstorage shipping addres
const addBtn = document.querySelector('#saveBuynowShip');
const email = document.querySelector('#buynowEmail');
const phone = document.querySelector('#buynowPhone');
const address = document.querySelector('#buynowAddress');

let shipDetail = JSON.parse(localStorage.getItem('shippingCustomerDetails'));

let newShipData = [...shipDetail] || [];

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const obj = {
    email: email.value,
    phone: phone.value,
    address: address.value,
  };

  newShipData.push(obj);

  localStorage.setItem('shippingCustomerDetails', JSON.stringify(newShipData));
});

//paypal
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
              value: `${Total}`,
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
