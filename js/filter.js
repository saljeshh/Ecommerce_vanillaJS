const parentFilterEl = document.querySelector('#filterbar');
const filterContainer = document.querySelector('#filterpage');
let jsondata = '';

async function getData() {
  const response = await fetch('http://127.0.0.1:5500/js/data.json');
  const data = await response.json();
  return data;
}

parentFilterEl.addEventListener('click', (e) => {
  const current = e.target.closest('.filterbar__bar');
  const currentDatasetValue = current.dataset.category;
  console.log(current);
  console.log(current.dataset.category);

  async function filterbarHandler() {
    let context = '';
    jsondata = await getData();

    const filteredData = jsondata.filter(
      (item) => item.category === currentDatasetValue
    );

    filteredData.forEach((item) => {
      let ratingNum = '';
      for (let i = 1; i <= item.rating; i++) ratingNum += '⭐';

      context += `
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
    });

    // console.log(context);

    filterContainer.innerHTML = context;
  }

  filterbarHandler();
});
