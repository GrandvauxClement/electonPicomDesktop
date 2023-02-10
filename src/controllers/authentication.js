const loginBtn = document.querySelector('#login-btn');
const inputEmail = document.querySelector("#emailInput");
const inputPassword = document.querySelector("#passwordInput")
async function onClickLogin() {
    //console.log(inputEmail.target.value);
    console.log(inputPassword.value)
    await window.electronAPI.loadTokens()

    /*const request = new Request(
        'http://127.0.0.1:8280/auth/login',
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "admin@admin.com",
                password: "Admin123"
            })
        }
    )
    fetch(request)
        .then((res) => {

            res.json().then((data) => {
                console.log("RESPONSE --> ", data);
                window.ipcRenderer.invokeAdminDashboard({
                    type: 'admin-dashboard',
                    token: data.token// exemple: add-expense => après le split on a ['add', 'expense']
                })
            })
        })*/
    /* window.ipcRenderer.sendOpenNewItemWindow({
         type: e.target.id.split('-')[1] // exemple: add-expense => après le split on a ['add', 'expense']
     })*/
}

loginBtn.addEventListener('click', onClickLogin)
