let jsondata = '';
let searchKey = JSON.parse(localStorage.getItem('searchKEY'));
const searchBookContainer = document.querySelector('#search');
const serachfor = document.querySelector('#searchfor');
let lowercaseKey = searchKey.toLowerCase();

async function getData() {
  const response = await fetch('http://127.0.0.1:5500/js/data.json');
  const data = response.json();
  return data;
}

async function displaySearchResults() {
  jsondata = await getData();

  // for searchiing

  let searchTitleObject = [];

  jsondata.forEach((item) => {
    const title = item.title.toLowerCase();
    const titleArr = title.split(' ');
    searchTitleObject.push({
      id: item.id,
      title: title,
    });
  });

  const newSearchArr = searchTitleObject.filter((item) => {
    return item['title'].includes(lowercaseKey);
  });

  console.log(newSearchArr);

  let searchHTML = '';
  let filteredBookArray = [];
  let bookId;

  newSearchArr.forEach((item) => {
    bookId = item.id;
    console.log(bookId);

    jsondata.forEach((item) => {
      if (item.id === bookId) {
        filteredBookArray.push(item);
      }
    });
  });

  filteredBookArray.forEach((item) => {
    let ratingNum = '';
    for (let i = 1; i <= item.rating; i++) ratingNum += '⭐';
    searchHTML += `
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

    searchBookContainer.innerHTML = searchHTML;
    serachfor.textContent = `"${searchKey}"`;
  });
}
displaySearchResults();
