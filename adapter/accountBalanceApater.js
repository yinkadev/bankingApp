const axios = require("axios");
const { getNibssToken } = require("./tokenAdapter");

const BASE_URL = "https://nibssbyphoenix.onrender.com";

const accountBalance = async (accountNumber) => {
  try {
    const token = await getNibssToken();

    const response = await axios.get(
      `${BASE_URL}/api/account/balance/${accountNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        timeout: 15000
      }
    );

    return response.data;

  } catch (error) {
  
   (error.response?.data || error.message);

    throw new Error(
      error.response?.data?.message || "Failed to fetch account balance"
    );
  }
};

module.exports = { accountBalance };