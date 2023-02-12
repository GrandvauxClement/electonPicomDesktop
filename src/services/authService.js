const jwtDecode = require('jwt-decode');
const axios = require('axios');
const url = require('url');
//const envVariables = require('../env-variables');
const keytar = require('keytar');
const os = require('os');

const createAppWindow = require("../process/mainProcess");
const {destroyAuthWin} = require("../process/authProcess");


//const {apiIdentifier, auth0Domain, clientId} = envVariables;

const redirectUri = 'http://localhost/callback';

const keytarService = 'electron-openid-oauth';
const keytarAccount = "admin";

let accessToken = null;
let profile = null;
let refreshToken = null;

async function getAccessToken() {
    const token = await keytar.getPassword('electron-openid-oauth', "admin");
    return token
}

function getProfile() {
    return profile;
}

function getAuthenticationURL() {
    return (
       /* "https://" +
        auth0Domain +
        "/authorize?" +
        "scope=openid profile offline_access&" +
        "response_type=code&" +
        "client_id=" +
        clientId +
        "&" +
        "redirect_uri=" +
        redirectUri*/
        "http://127.0.0.1:8280/auth/login"
    );
}

async function refreshTokens() {


        try {
            const refreshToken = await keytar.getPassword(keytarService, keytarAccount);
            console.log("Refresh token --> ", refreshToken);
            return refreshToken
        } catch (error) {
            await logout();

            throw error;
        }
}

async function loadTokens(args) {
    try {
          const response = await axios({
              method: 'POST',
              url: "http://127.0.0.1:8280/auth/login",
              headers: {'content-type': 'application/json'},
              data: {
                email: args.email,
                password: args.password
            }
          });
        accessToken = response.data.accessToken;

        createAppWindow(response.data.accessToken);
        destroyAuthWin();
        return true

    } catch (error) {
        await logout();

        throw error;
    }
}

async function logout() {
    await keytar.deletePassword(keytarService, keytarAccount);
    accessToken = null;
    profile = null;
    refreshToken = null;
}

module.exports = {
    getAccessToken,
    getAuthenticationURL,
    getProfile,
    loadTokens,
    logout,
    refreshTokens,
};
