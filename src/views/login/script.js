const loginBtn = document.querySelector('#login-btn');
const inputEmail = document.querySelector("#emailInput");
const inputPassword = document.querySelector("#passwordInput")
async function onClickLogin() {
    console.log("password ",inputPassword.value)
    await window.electronAPI.loadTokens({email: inputEmail.value, password: inputPassword.value})
}

loginBtn.addEventListener('click', onClickLogin)
