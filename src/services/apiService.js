const authService = require('./authService');

async function getPrivateData() {
    console.log("api servicee get private Data --> ")
   /* const request = new Request(
        'http://127.0.0.1:8280/api/user',
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }
    )*/
    fetch('http://127.0.0.1:8280/api/user', {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${authService.getAccessToken()}`
        }
    })
        .then((res) => {
            res.json().then((data) => {
                console.log("RESPONSE --> ", data);
                //  profile = jwtDecode(response.data.id_token);
                //  refreshToken = response.data.refresh_token;
                return data
            })
        })

    /*const result = await axios.get('http://localhost:3000/private', {
        headers: {
            'Authorization': `Bearer ${authService.getAccessToken()}`,
        },
    });
    return result.data;*/
}

module.exports = {
    getPrivateData,
}
