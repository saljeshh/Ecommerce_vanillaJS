const btn = document.querySelector('#register');
const email = document.querySelector('#email');
const fullName = document.querySelector('#fname');
const password = document.querySelector('#password');
const permanentAddress = document.querySelector('#permanentAddress');
const phone = document.querySelector('#phone');
const dob = document.querySelector('#dob');
const confirmPassword = document.querySelector('#confirmPassword');
const tempAddress = document.querySelector('#tempAddress');

let users = JSON.parse(localStorage.getItem('users')) || [];

btn.addEventListener('click', (event) => {
  event.preventDefault();
  users.push({
    email: email.value,
    fullName: fullName.value,
    password: password.value,
    permanentAddress: permanentAddress.value,
    phone: phone.value,
    dob: dob.value,
    confirmPassword: confirmPassword.value,
    tempAddress: tempAddress.value,
    isAuth: false,
  });
  console.log(users);

  localStorage.setItem('users', JSON.stringify(users));
  resetForm();
});

function resetForm() {
  email.value = '';
  fullName.value = '';
  password.value = '';
  permanentAddress.value = '';
  phone.value = '';
  dob.value = '';
  confirmPassword.value = '';
  tempAddress.value = '';
}
