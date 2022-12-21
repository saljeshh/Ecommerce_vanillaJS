const cartContainer = document.querySelector('#itemsincart');
const summarySubTotal = document.querySelector('#summaryContainer');
const shipping = document.querySelector('#summaryShipping');
const VAT = document.querySelector('#summaryVat');
const totals = document.querySelector('#summaryTotal');
const coupDiscount = document.querySelector('#discount');

const checkoutbtn = document.querySelector('#checkoutbtn');

let cart;

if (JSON.parse(localStorage.getItem('cart-items'))) {
  const data = JSON.parse(localStorage.getItem('cart-items'));
  // making new copy
  cart = [...data];
  console.log(cart);
}

function renderCart() {
  // resetting to avoid duplicatiion
  cartContainer.innerHTML = '';

  cart.forEach((item) => {
    cartContainer.innerHTML += `
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
              <p class="cart__number quantity" id="quantity">${
                item.numberOfUnits
              }</p>
              <button class="cart__btns btn-quantity plus" onclick="changeQuantity('plus',${
                item.id
              })" >+</button>
            </div>
          </div>
          <div class="cart__col">Rs. ${(
            (item.price - (item.price * item.discountPercent) / 100) *
            item.numberOfUnits
          ).toFixed(2)}</div>
          <div class="cart__col">
            <button class="btn btn--remove remove" onclick="removeItem(${
              item.id
            })">remove</button>
          </div>
          </div>
      `;
  });
}
renderCart();

function updateCartPage() {
  renderCart();
  renderSubtotal();

  localStorage.setItem('cart-items', JSON.stringify(cart));
}

function changeQuantity(operation, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (operation === 'plus' && numberOfUnits < item.stock) {
        numberOfUnits++;
      } else if (operation === 'minus' && numberOfUnits > 1) {
        numberOfUnits--;
      }
    }

    return {
      ...item,
      numberOfUnits: numberOfUnits,
    };
  });

  updateCartPage();
}

let coupounDiscount;
function addCoupoun() {
  let enteredCoupoun = document.getElementById('coupoun').value;
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

  coupDiscount.textContent = `- Rs. ${coupounDiscount}`;
  updateCartPage();
}

// // for shipping charge
// function getRandomShippingCharge(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function renderSubtotal() {
  let vat = 0;
  let subtotal = 0;
  let shippingCharge = 120;
  let total;

  // error in vat need to fix
  cart.forEach((item) => {
    let price = item.price - (item.price * item.discountPercent) / 100;
    subtotal += price * item.numberOfUnits;
    summarySubTotal.textContent = `Rs. ${subtotal.toFixed(2)}`;
  });

  shipping.textContent = shippingCharge;

  vat = (subtotal * 13) / 100;
  VAT.textContent = `Rs. ${vat.toFixed(2)}`;

  // for total
  if (coupounDiscount) {
    total = subtotal + shippingCharge + vat - coupounDiscount;
    totals.textContent = `${total.toFixed(2)}`;
  } else {
    total = subtotal + shippingCharge + vat;
    totals.textContent = `${total.toFixed(2)}`;
  }
}
renderSubtotal();

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartPage();
}

checkoutbtn.addEventListener('click', (event) => {
  event.preventDefault();

  let totalPay = Number(document.querySelector('#summaryTotal').textContent);
  console.log(totalPay);
  console.log(typeof totalPay);

  const paymentTotal = {
    totalAmount: totalPay,
  };

  localStorage.setItem('totalPay', JSON.stringify(paymentTotal));

  window.location.replace('http://127.0.0.1:5500/pages/checkout.html');
});
