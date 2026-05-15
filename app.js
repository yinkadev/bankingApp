const express = require('express');
const connectDB = require('./config/db');
require("dotenv").config();

const onboardRoutes = require('./routes/onboardRoute');
const accountRoutes = require('./routes/accountRoute');
const inquiryRoutes = require('./routes/nameIquiryRoute');
const balanceRoutes = require("./routes/balanceRoute");
const transferRoutes = require('./routes/transferRoute');
const transactionRoutes = require("./routes/queryRoute");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Routes
app.use('/api', onboardRoutes);
app.use('/api/account', accountRoutes);
app.use('/api', inquiryRoutes);
app.use("/api/balance", balanceRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api", transactionRoutes);

// Connect DB then start server
connectDB()
  .then(() => {
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });