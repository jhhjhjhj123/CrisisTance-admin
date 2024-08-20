const form = document.forms["login-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  window.location.href = "./html/Dashboard.html";
});
