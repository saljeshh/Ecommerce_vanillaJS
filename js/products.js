const productDetailContainer = document.querySelector('#productdetail');
const pid = new URL(document.location).searchParams.get('id');
console.log(pid);
let suggestionContainer = document.querySelector('#suggestedProducts');

let jsondata = '';
let cart = JSON.parse(localStorage.getItem('cart-items')) || [];

async function getData() {
  const response = await fetch('http://127.0.0.1:5500/js/data.json');
  const data = await response.json();
  return data;
}

async function displayProduct() {
  jsondata = await getData();

  // calculations for ratings
  let rating = '';
  let newProductHtml = '';

  const product = jsondata.find((item) => {
    return item.id === Number(pid);
  });
  console.log(product);

  let stock = product.stock;
  console.log(stock);

  for (let i = 0; i <= product.rating; i++) {
    rating += '⭐';
  }

  newProductHtml = `
  <div class="productdetail__contains container">
    <div class="productdetail__showcase">
      <div class="productdetail__window">
        <img
          class="productdetail__image"
          src="../${product.image}"
          alt="${product.title}"
        />
      </div>
      <div class="productdetail__switches">
        <div class="productdetail__switch">
          <img
            class="productdetail__image"
            src="../${product.images[0]}"
            alt=""
          />
        </div>
        <div class="productdetail__switch">
          <img
            class="productdetail__image"
            src="../${product.images[1]}"
            alt=""
          />
        </div>
        <div class="productdetail__switch">
          <img
            class="productdetail__image"
            src="../${product.images[2]}"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="productdetail__description">
      <div class="productdetail__title">${product.title}</div>
      <div class="productdetail__rating">${rating}</div>
      <p class="productdetail__discounted-price">
        Rs ${product.price - (product.price * product.discountPercent) / 100}
      </p>
      <p class="productdetail__original-price">
        <span class="productdetail__cut">Rs. ${product.price}</span>
        <span class="productdetail__dis">-${product.discountPercent}%</span>
      </p>
      <h3 class="productdetail__desc">Product Description</h3>
      <article class="productdetail__specs">${product.description}</article>
      <div class="productdetail__buttons" id="productBtn">
        <a href="../pages/buynow.html" id="buynow" class="btn btn--buynow">Buy Now</a>
        <a class="btn btn--addtocart" id="addtocart" onclick="addToCart(${
          product.id
        })">Add to Cart</a>
      </div>
      <a href="../index.html" class="productdetail__continue">Continue Shopping ></a>
    </div>
</div>
    `;
  productDetailContainer.innerHTML = newProductHtml;
}
displayProduct();

async function addToCart(id) {
  // check if the product has already been added
  if (cart.some((item) => item.id === id)) {
    alert('Aleardy in Cart - continue shopping');
  } else {
    const item = jsondata.find((product) => product.id === id);
    // console.log(item);
    cart.push({ ...item, numberOfUnits: 1 });
    alert('Added to Cart!!');
  }

  // push to localstorage
  localStorage.setItem('cart-items', JSON.stringify(cart));
}

let newdata = '';
async function suggestedProduct() {
  newdata = await getData();
  let updateDom = '';

  const buynowbtn = document.querySelector('#buynow');

  const ourCurrentProduct = newdata.find((item) => item.id === Number(pid));
  console.log(ourCurrentProduct);

  console.log(buynowbtn);

  buynowbtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('buynowProduct', JSON.stringify(ourCurrentProduct));
    window.location.replace('http://127.0.0.1:5500/pages/buynow.html');
  });

  const thisProductCategory = ourCurrentProduct['category'];

  const filteredProducts = newdata.filter((product) => {
    return product.category !== thisProductCategory;
  });

  for (let item = 0; item < filteredProducts.length; item++) {
    let ratingNum = '';

    for (let i = 1; i <= filteredProducts[item].rating; i++) ratingNum += '⭐';

    if (item < 4) {
      updateDom += `
        <a class="card" href="../pages/productDetail.html?id=${
          filteredProducts[item].id
        }">
          <div class="card__image">
            <img src="../${filteredProducts[item].image}" alt="${
        filteredProducts[item].title
      }" />
          </div>
          <div class="card__description">
            <div class="card__title">
              <p>${filteredProducts[item].title}</p>
            </div>
            <div class="card__price">
              <p class="card__discounted-price">Rs ${
                filteredProducts[item].price -
                (filteredProducts[item].price *
                  filteredProducts[item].discountPercent) /
                  100
              }</p>
              <p>
                <span class="card__original-price">Rs. ${
                  filteredProducts[item].price
                }</span
                ><span class="card__discountper">-${
                  filteredProducts[item].discountPercent
                }%</span>
              </p>
            </div>
            <div class="card__rating">${ratingNum}</div>
          </div>
        </a>
      `;
      // console.log(item);
    } else {
      break;
    }
  }

  suggestionContainer.innerHTML = updateDom;
}
suggestedProduct();
