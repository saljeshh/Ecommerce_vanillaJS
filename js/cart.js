const cartContainer = document.querySelector('#itemsincart');
const summaryContainer = document.querySelector('#summary');

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
          <div class="cart__col">Rs. ${
            (item.price - (item.price * item.discountPercent) / 100) *
            item.numberOfUnits
          }</div>
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

function renderSubtotal() {
  let subtotal = 0;

  cart.forEach((item) => {
    let price = item.price - (item.price * item.discountPercent) / 100;
    subtotal += price * item.numberOfUnits;
  });

  console.log(subtotal);
}
renderSubtotal();

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartPage();
}
