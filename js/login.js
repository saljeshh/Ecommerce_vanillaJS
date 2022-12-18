const loginBtn = document.querySelector('#login');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const data = JSON.parse(localStorage.getItem('users')) || [];
console.log(data);
const newData = [...data];

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const user = data.find((user) => user.email === email.value) || [];

  if (!user) {
    alert('Please register first');
  } else if (user) {
    if (user.password === password.value && user.email === email.value) {
      user.isAuth = true;
      localStorage.setItem('users', JSON.stringify(newData));
      localStorage.setItem('requestedLoginUser', JSON.stringify(user));
      window.location.replace(`http://127.0.0.1:5500/index.html`);
    } else {
      alert('Invalid password !! Please check');
    }
  }
});
