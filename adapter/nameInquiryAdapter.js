const axios = require("axios");

const BASE_URL = 'https://nibssbyphoenix.onrender.com';

const nameInquiry = async (accountNumber) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/account/name-enquiry/${accountNumber}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NIBSS_TOKEN}`
        }
      }
    );

    return response.data;

  } catch (error) {
  
(error.response?.data || error.message);

    throw error;
  }
};

module.exports = { nameInquiry };