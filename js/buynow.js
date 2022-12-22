const item = JSON.parse(localStorage.getItem('buynowProduct'));

//const totalCheckoutContainer = document.querySelector('#totalbuynow');

// shipping details

// // for localstorage shipping addres
// const addBtn = document.querySelector('#saveBuynowShip');
// const email = document.querySelector('#buynowEmail');
// const phone = document.querySelector('#buynowPhone');
// const address = document.querySelector('#buynowAddress');

// let shipDetail = JSON.parse(localStorage.getItem('shippingCustomerDetails'));

// let newShipData = [...shipDetail] || [];

// addBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   const obj = {
//     email: email.value,
//     phone: phone.value,
//     address: address.value,
//   };

//   newShipData.push(obj);

//   localStorage.setItem('shippingCustomerDetails', JSON.stringify(newShipData));
// });

const buyContainer = document.querySelector('#buyContainer');
const buySubtotal = document.querySelector('#buySubtotal');
const buyShipping = document.querySelector('#buyShipping');
const buyVAT = document.querySelector('#buyVAT');
const buyTotal = document.querySelector('#buyTotal');
const buyCheckout = document.querySelector('#buyCheckout');
const buyDiscount = document.querySelector('#buyDiscount');
const buyCoupoun = document.querySelector('#buyCoupoun');
console.log(item);
function renderBuyItem() {
  buyContainer.innerHTML = `
    <div class="cart__row">
    <div class="cart__col cart__col--extra">
      <img src="../${item.image}" alt="" class="cart__image" />
      <p>${item.title}</p>
    </div>
    <div class="cart__col">Rs. ${
      item.price - (item.price * item.discountPercent) / 100
    }</div>
    <div class="cart__col">
      <div class="cart__quantity">
        <button class="cart__btns btn-quantity minus" onclick="changeQuantity('minus',${
          item.id
        })">-</button>
        <p class="cart__number quantity" id="quantity">${item.numberOfUnits}</p>
        <button class="cart__btns btn-quantity plus" onclick="changeQuantity('plus',${
          item.id
        })" >+</button>
      </div>
    </div>
    <div class="cart__col">Rs. ${(
      (item.price - (item.price * item.discountPercent) / 100) *
      item.numberOfUnits
    ).toFixed(2)}</div>
    </div>
  `;
}
renderBuyItem();

function updateBuyPage() {
  renderBuyItem();
  renderBuySummary();
}

function changeQuantity(operation, id) {
  console.log(item.stock);
  if (item.id === id) {
    if (operation === 'plus' && item.numberOfUnits < item.stock) {
      item.numberOfUnits++;
    } else if (operation === 'minus' && item.numberOfUnits > 1) {
      item.numberOfUnits--;
    }
  }

  updateBuyPage();
}

let coupounDiscount;
function addCoupoun() {
  let enteredCoupoun = document.getElementById('buyCoupoun').value;
  console.log(enteredCoupoun);

  const coupoun = {
    AJAKO100: 100,
    CHRISTMAS500: 500,
  };
  const objCoupoun = Object.keys(coupoun);
  console.log(objCoupoun);
  if (enteredCoupoun === objCoupoun[0]) {
    console.log(' discount 100');
    coupounDiscount = 100;
  } else if (enteredCoupoun === objCoupoun[1]) {
    coupounDiscount = 500;
  }

  buyDiscount.textContent = `- Rs. ${coupounDiscount}`;
  updateBuyPage();
}

function renderBuySummary() {
  let vat = 0;
  let subtotal = 0;
  let shippingCharge = 120;
  let total;

  // error in vat need to fix

  let price = item.price - (item.price * item.discountPercent) / 100;
  subtotal += price * item.numberOfUnits;
  buySubtotal.textContent = `Rs. ${subtotal.toFixed(2)}`;

  buyShipping.textContent = shippingCharge;

  vat = (subtotal * 13) / 100;
  buyVAT.textContent = `Rs. ${vat.toFixed(2)}`;

  // for total
  if (coupounDiscount) {
    total = subtotal + shippingCharge + vat - coupounDiscount;
    buyTotal.textContent = `${total.toFixed(2)}`;
  } else {
    total = subtotal + shippingCharge + vat;
    buyTotal.textContent = `${total.toFixed(2)}`;
  }
}
renderBuySummary();

buyCheckout.addEventListener('click', (event) => {
  event.preventDefault();

  let totalPay = Number(document.querySelector('#buyTotal').textContent);
  console.log(totalPay);
  console.log(typeof totalPay);

  const paymentTotal = {
    totalAmount: totalPay,
  };

  localStorage.setItem('totalPay', JSON.stringify(paymentTotal));

  window.location.replace('http://127.0.0.1:5500/pages/checkout.html');
});
