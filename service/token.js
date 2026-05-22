const axios = require("axios");

let cachedToken = null;
let tokenExpiry = null;

const getNibssToken = async () => {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const res = await axios.post(
    "https://nibssbyphoenix.onrender.com/api/auth/token",
    {
      apiKey: process.env.NIBSS_API_KEY,
      apiSecret: process.env.NIBSS_API_SECRET
    }
  );

  cachedToken = res.data.token;
  tokenExpiry = Date.now() + 55 * 60 * 1000;

  return cachedToken;
};

module.exports = { getNibssToken };