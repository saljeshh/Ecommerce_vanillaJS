const productDetailContainer = document.querySelector('#productdetail');
const params = new URL(document.location).searchParams;
const pid = params.get('id');

console.log(pid);

// console.log(params.get('id'));

window.addEventListener('load', async () => {
  const data = await fetch('http://127.0.0.1:5500/js/data.json');
  const res = await data.json();

  console.log(res);

  const product = res.filter((item) => {
    return item.id === Number(pid);
  });
  console.log(product);

  let ratingNum = '';

  let newProductDetailHtml = '';

  product.forEach((item) => {
    for (let i = 1; i <= item.rating; i++) {
      // extra stars left
      ratingNum += '*';
    }

    newProductDetailHtml = `
  <div class="productdetail__contains container">
  <div class="productdetail__showcase">
    <div class="productdetail__window">
      <img class="productdetail__image" src="../${item.image}" alt="${
      item.title
    }" />
    </div>
    <div class="productdetail__switches">
      <div class="productdetail__switch">
        <img class="productdetail__image" src="../${item.images[0]}" alt="" />
      </div>
      <div class="productdetail__switch">
        <img class="productdetail__image" src="../${item.images[1]}" alt="" />
      </div>
      <div class="productdetail__switch">
        <img class="productdetail__image" src="../${item.images[2]}" alt="" />
      </div>
    </div>
  </div>
  <div class="productdetail__description">
    <div class="productdetail__title">${item.title}</div>
    <div class="productdetail__rating">${ratingNum}</div>
    <p class="productdetail__discounted-price">Rs ${
      item.price - (item.price * item.discountPercent) / 100
    }</p>
    <p class="productdetail__original-price">
      <span class="productdetail__cut">Rs. ${item.price}</span>
      <span class="productdetail__dis">-${item.discountPercent}%</span>
    </p>
    <h3 class="productdetail__desc">Product Description</h3>
    <article class="productdetail__specs">
    ${item.description}
    </article>

    <div class="productdetail__quantity">
      <button class="productdetail__btns btn-quantity">-</button>
      <p class="productdetail__number">1</p>
      <button class="productdetail__btns btn-quantity">+</button>
    </div>

    <div class="productdetail__buttons">
      <a href="../pages/checkout.html" class="btn btn--buynow">Buy Now</a>
      <a href="../pages/cart.html" class="btn btn--addtocart"
        >Add to Cart</a
      >
    </div>
  </div>
</div>
  
  `;
  });

  productDetailContainer.innerHTML = newProductDetailHtml;
});
