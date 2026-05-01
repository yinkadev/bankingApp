const axios = require("axios");
const { getNibssToken } = require("../token");

const BASE_URL = 'https://nibssbyphoenix.onrender.com';

const queryTransactionStatus = async (transactionId) => {
  try {
    const token = await getNibssToken();

    const response = await axios.get(
    `${BASE_URL}/api/transaction/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );


    return response.data;

  } catch (error) {
    (
error.response?.data || error.message );

    throw new Error(
      error.response?.data?.message || "Transaction query failed"
    );
  }
};

module.exports = { queryTransactionStatus };