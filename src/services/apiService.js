const authService = require('./authService');
const axios = require("axios");
const keytar = require('keytar');

async function getAllUsers() {
    console.log("api servicee get private Data --> ", authService.getAccessToken())
    const token = await keytar.getPassword('electron-openid-oauth', "admin");

    const response = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:8280/api/user',
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return response.data
}

async function getAllArea() {
    console.log("api servicee get area --> ", authService.getAccessToken())
    const token = await authService.getAccessToken()

    const response = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:8280/api/area/',
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    console.log("esponse . data ---> ", response.data)
    return response.data
}
module.exports = {
    getAllUsers,
    getAllArea
}
