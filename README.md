# Banking App API
A simple banking backend built with Node.js, Express, and MongoDB.
The system supports:
User onboarding
BVN verification
Account creation
Name enquiry
Balance checks
Money transfers
Transaction tracking
It also integrates with external financial APIs using adapter

## Features
 User onboarding
 Account creation
 Name enquiry (account verification)
 Balance inquiry
 Fund transfer between accounts
 Transaction tracking with reference ID
 External transfer integration

## Tech Stack
 Node.js
 Express.js
 MongoDB + Mongoose
 Axios (for external API calls)
 Dotenv

  ## Project Structure
adapter/
controllers/
models/
routes/
config/
app.js
token.js

## Installation
### 1. Clone the repository
git clone https://github.com/your-username/bankingApp.git
cd bankingApp
npm install
npm run dev

 # env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/bankapp
API_KEY=your_nibss_api_key
API_SECRET=your_nibss_api_secret
BASE_URL=https://nibssbyphoenix.onrender.com

# Api EndPoint
# BVN ENDPOINT
POST /api/insertBvn
POST /api/validateBvn
# USER ONBOARDING
POST /api/onboard
# ACCOUNT ENDPOINT
POST /api/account/create
GET /api/account/all
GET /api/balance/:accountNumber
# NAME ENQUIRY ENDPOINT
GET /api/name-enquiry/:accountNumber
# TRANSFER
POST /api/transfer
GET /api/transaction/:transactionId

# EXAMPLE ENDPOINT
POST http://localhost:3000/api/onboard
GET http://localhost:3000/api/balance/1397671967
POST http://localhost:3000/api/transfer

# Author
Built by Yimika 
For learning backend systems and financial API integration.
