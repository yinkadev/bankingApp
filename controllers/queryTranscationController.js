const { queryTransactionStatus } = require("../adapter/queryTranscationAdapter");

exports.getTransactionStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({
        message: "Transaction ID is required",
      });
    }

    const result = await queryTransactionStatus(transactionId);

    return res.status(200).json({
      message: "Transaction status fetched successfully",
      data: result,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch transaction status",
      error: error.message,
    });
  }
};