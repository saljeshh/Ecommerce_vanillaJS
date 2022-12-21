const headerAuthSection = document.querySelector('#headerAuth');
const searchValue = document.querySelector('#searchValue');
const searchBtn = document.querySelector('#searchbtn');
// const userEmail = new URL(document.location).searchParams.get('email');
const userEmail = JSON.parse(localStorage.getItem('requestedLoginUser')).email;
console.log(userEmail);

const data = JSON.parse(localStorage.getItem('users'));
const newData = [...data];

const user = data.find((user) => user.email === userEmail);

if (user.isAuth) {
  headerAuthSection.innerHTML = `
    <li class="header__hidden"><span class="header__welcometxt">Welcome</span><span class="header__greeting">${user.fullName}</span></li>
    <li class="header__hidden"><button class="btn btn--seemore header_item" id="logout">Logout</button></li>
    `;
}

window.onload = () => {
  if (user.isAuth) {
    const logoutBtn = document.querySelector('#logout');
    logoutBtn.addEventListener('click', () => {
      user.isAuth = false;
      localStorage.setItem('users', JSON.stringify(newData));
      headerAuthSection.innerHTML = `
            <li><a href="./pages/login.html" class=" btn btn--seemore header_item">Login</a></li>
            <li><a href="./pages/register.html" class=" btn btn--search header_item">Register</a></li>
            `;
    });
  }

  let searchdata;
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    searchdata = searchValue.value;
    console.log(searchdata);

    localStorage.setItem('searchKEY', JSON.stringify(searchdata));

    window.location.replace('http://127.0.0.1:5500/pages/search.html');
  });
};
