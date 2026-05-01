const axios = require("axios");

const BASE_URL = "https://nibssbyphoenix.onrender.com";

const createAccount = async ({ payload, token }) => {
  try {
    if (!token) {
      throw new Error("Token is required");
    }

    const response = await axios.post(
      `${BASE_URL}/api/account/create`,
      payload,
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
     (error.response?.data || error);
  throw new Error(error.response?.data?.message || error.message);
  }
};

module.exports = { createAccount };