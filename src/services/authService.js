const jwtDecode = require('jwt-decode');
const axios = require('axios');
const url = require('url');
//const envVariables = require('../env-variables');
const keytar = require('keytar');
const os = require('os');

const createAppWindow = require("../../main/mainProcess");
const {destroyAuthWin} = require("../../main/authProcess");


//const {apiIdentifier, auth0Domain, clientId} = envVariables;

const redirectUri = 'http://localhost/callback';

const keytarService = 'electron-openid-oauth';
const keytarAccount = os.userInfo().username;

let accessToken = null;
let profile = null;
let refreshToken = null;

function getAccessToken() {
    return accessToken;
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
    const refreshToken = await keytar.getPassword(keytarService, keytarAccount);

    if (refreshToken) {
        const refreshOptions = {
            method: 'POST',
            url: "http://127.0.0.1:8280/auth/login",
            headers: {'content-type': 'application/json'},
            /*data: {
                grant_type: 'refresh_token',
                client_id: clientId,
                refresh_token: refreshToken,
            }*/
        };

        try {
        //  const response = await axios(refreshOptions);

          /*  accessToken = response.data.access_token;
            profile = jwtDecode(response.data.id_token);*/
        } catch (error) {
            await logout();

            throw error;
        }
    } else {
        throw new Error("No available refresh token.");
    }
}

async function loadTokens() {

    try {
          const response = await axios({
              method: 'POST',
              url: "http://127.0.0.1:8280/auth/login",
              headers: {'content-type': 'application/json'},
              data: {
                email: "admin@admin.com",
                password: "Admin123"
            }
          });

        /*  accessToken = response.data.access_token;
          profile = jwtDecode(response.data.id_token);*/
        console.log("RESPONSE --> ", response.data);
        accessToken = response.data.token;
        //  profile = jwtDecode(response.data.id_token);
        //  refreshToken = response.data.refresh_token;
        createAppWindow();
        return destroyAuthWin();
        if (accessToken) {
            await keytar.setPassword(keytarService, keytarAccount, accessToken);
        }

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

function getLogOutUrl() {
    return `https://${auth0Domain}/v2/logout`;
}

module.exports = {
    getAccessToken,
    getAuthenticationURL,
    getLogOutUrl,
    getProfile,
    loadTokens,
    logout,
    refreshTokens,
};
