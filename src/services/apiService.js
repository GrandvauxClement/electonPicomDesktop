const authService = require('./authService');
const axios = require("axios");
const keytar = require('keytar');

async function getAllUsers() {
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
    return response.data
}

async function getAreaById(params) {
    const token = await authService.getAccessToken()
    const response = await axios({
        method: 'GET',
        url: `http://127.0.0.1:8280/api/area/${params.id}`,
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return response.data
}

async function deleteStopById(params) {
    const token = await authService.getAccessToken()
    const response = await axios({
        method: 'DELETE',
        url: `http://127.0.0.1:8280/api/stop/${params.id}`,
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return response.data
}

async function addStop(params) {
    const token = await authService.getAccessToken()
    const response = await axios({
        method: 'POST',
        url: `http://127.0.0.1:8280/api/stop`,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: params
    })
    return response.data
}

async function updateArea(params) {
    const token = await authService.getAccessToken()
    const response = await axios({
        method: 'PATCH',
        url: `http://127.0.0.1:8280/api/area/`,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: params
    })
    return response.data
}

module.exports = {
    getAllUsers,
    getAllArea,
    getAreaById,
    deleteStopById,
    addStop,
    updateArea
}
