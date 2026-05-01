const axios = require('axios');

const BASE_URL = 'https://nibssbyphoenix.onrender.com';

const validateBvn = async (bvn) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/validateBvn`,
      { bvn },
      {
        headers: {
          Authorization: `Bearer ${process.env.NIBSS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;

  } catch (error) {
    return {
      valid: false,
      message: error.response?.data?.message || error.message
    };
  }
};

module.exports = { validateBvn };