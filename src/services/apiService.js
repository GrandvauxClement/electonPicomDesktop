const authService = require('./authService');
const axios = require("axios");
const keytar = require('keytar');

async function getAllUsers() {

    const token = await keytar.getPassword(`${process.env.KEYTAR_SERVICE}`, `${process.env.KEYTAR_ACCOUNT}`);
    const response = await axios({
        method: 'GET',
        url: `${process.env.API_URL}api/user`,
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return response.data
}

async function getUserById(param) {

    const token = await keytar.getPassword(`${process.env.KEYTAR_SERVICE}`, `${process.env.KEYTAR_ACCOUNT}`);
    const response = await axios({
        method: 'GET',
        url: `${process.env.API_URL}api/user/${param.id}`,
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return response.data
}

async function getAdsByUserId(param) {

    const token = await keytar.getPassword(`${process.env.KEYTAR_SERVICE}`, `${process.env.KEYTAR_ACCOUNT}`);
    const response = await axios({
        method: 'GET',
        url: `${process.env.API_URL}api/ads/user/${param.id}`,
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
    console.log("token get for all area !! :) ", token);
    const response = await axios({
        method: 'GET',
        url: `${process.env.API_URL}api/area`,
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    } )
    return response.data
}

async function getAreaById(params) {
    const token = await authService.getAccessToken()
    const response = await axios({
        method: 'GET',
        url: `${process.env.API_URL}api/area/${params.id}`,
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
        url: `${process.env.API_URL}api/stop/${params.id}`,
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
        url: `${process.env.API_URL}api/stop`,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: params
    })
    console.log("Add Stop data return --> ", response.data);
    return response.data
}

async function updateArea(params) {
    const token = await authService.getAccessToken()
    const response = await axios({
        method: 'PATCH',
        url: `${process.env.API_URL}api/area`,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: params
    })
    return response.data
}

async function createArea(params) {
    const token = await authService.getAccessToken()
    const response = await axios({
        method: 'POST',
        url: `${process.env.API_URL}api/area`,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: params
    })
    return response.data
}

async function deleteAreaById(params) {
    const token = await authService.getAccessToken()
    const response = await axios({
        method: 'DELETE',
        url: `${process.env.API_URL}api/area/${params.id}`,
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return response.data
}

async function getAllTimeInterval() {
    const token = await authService.getAccessToken()

    const response = await axios({
        method: 'GET',
        url: `${process.env.API_URL}api/timeInterval`,
        headers: {
            Accept: "application/json",
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    return response.data
}

async function updateTimeInterval(params) {
    const token = await authService.getAccessToken()
    const response = await axios({
        method: 'PATCH',
        url: `${process.env.API_URL}api/timeInterval`,
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
    getUserById,
    getAdsByUserId,
    getAllArea,
    getAreaById,
    deleteStopById,
    addStop,
    updateArea,
    createArea,
    deleteAreaById,
    getAllTimeInterval,
    updateTimeInterval
}
