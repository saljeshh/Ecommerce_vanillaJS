const flashContainer = document.querySelector('#flashSalePage');
const justforyouContainer = document.querySelector('#justforyou');

window.addEventListener('load', async () => {
  const data = await fetch('http://127.0.0.1:5500/js/data.json');
  const res = await data.json();

  let flashData = '';

  res.forEach((item) => {
    let ratingNum = '';

    for (let i = 1; i <= item.rating; i++) ratingNum += '⭐';

    if (item.flashSale) {
      flashData += `
      <a class="card" href="../pages/productDetail.html?id=${item.id}">
      <div class="card__image">
        <img src="../${item.image}" alt="${item.title}" />
      </div>
      <div class="card__description">
        <div class="card__title">
          <p>${item.title}</p>
        </div>
        <div class="card__price">
          <p class="card__discounted-price">Rs ${
            item.price - (item.price * item.discountPercent) / 100
          }</p>
          <p><span class="card__original-price">Rs. ${
            item.price
          }</span><span class="card__discountper">-${
        item.discountPercent
      }%</span></p>
        </div>
        <div class="card__rating">${ratingNum}</div>
      </div>
    </a>
      `;
    }
    flashContainer.innerHTML = flashData;
  });
});
