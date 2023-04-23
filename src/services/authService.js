const jwtDecode = require('jwt-decode');
const axios = require('axios');
const keytar = require('keytar');
const { BrowserWindow } = require('electron');
const createAppWindow = require("../process/mainProcess");

let accessToken = null;
let profile = null;
let refreshToken = null;

async function getAccessToken() {
    const token = await keytar.getPassword(process.env.KEYTAR_SERVICE, process.env.KEYTAR_ACCOUNT);
    if (token != null){
        const decoded = jwtDecode(token)
        const expirationDate = new Date(decoded.exp * 1000);
        if (new Date() > expirationDate){
            await keytar.deletePassword(process.env.KEYTAR_SERVICE, process.env.KEYTAR_ACCOUNT);
            return null
        }
    }
    return token
}

function getProfile() {
    return profile;
}

async function refreshTokens() {
        try {
            const refreshToken = await keytar.getPassword(process.env.KEYTAR_SERVICE, process.env.KEYTAR_ACCOUNT);
            const decoded = jwtDecode(refreshToken)
            const expirationDate = new Date(decoded.exp * 1000);
            console.log("expiration date --> ", expirationDate);
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
              url: `${process.env.API_URL}auth/login`,
              headers: {'content-type': 'application/json'},
              data: {
                email: args.email,
                password: args.password
            }
          });

          if (response.status === 200 && response.data.roles.includes('ROLE_ADMIN')) {
              accessToken = response.headers['set-cookie'][0];
              const token = accessToken.split('=')[1].split(';')[0]

              const win = BrowserWindow.getFocusedWindow();
              win.close();
              createAppWindow(token);
              return true
          } else {
              return false
          }


    } catch (error) {
        await logout();

        throw error;
    }
}

async function logout() {
    await keytar.deletePassword(process.env.KEYTAR_SERVICE, process.env.KEYTAR_ACCOUNT);
    accessToken = null;
    profile = null;
    refreshToken = null;
}

module.exports = {
    getAccessToken,
    getProfile,
    loadTokens,
    logout,
    refreshTokens,
};
