const axios = require("axios");

const discordAPI = axios.create({
  baseURL: "https://discordapp.com/api/v8",
  //timeout: 5000,
});
 
module.exports = discordAPI;