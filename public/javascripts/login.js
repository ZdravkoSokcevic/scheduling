let loginCard = document.getElementById("login-card");
let registerCard = document.getElementById("register-card");

$(document).ready(() => {
  showLogin();
});

const showLogin = () => {
  registerCard.style.display = "none";
  loginCard.style.display = "block";
};

const showRegister = () => {
  registerCard.style.display = "block";
  loginCard.style.display = "none";
};
