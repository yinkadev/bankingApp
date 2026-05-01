const axios = require("axios");
const { getNibssToken } = require("../token");

const transferFunds = async (payload) => {
  try {
    const token = await getNibssToken();

 const response = await axios.post(
  "https://nibssbyphoenix.onrender.com/api/transfer",
  {
    from: payload.from,
    to: payload.to,
    amount: String(payload.amount),
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
);
    return response.data;

  } catch (error) {
  
  }
};
module.exports = { transferFunds };