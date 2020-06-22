const express = require("express");
const { connectDB } = require('./mongodb')
const installMiddlewareToServer = require('./graphql/server')

const app = express();

require("dotenv").config();

const PORT = process.env.API_SERVER_PORT || 3000;

const connectExpress = async () => {
  try {
    await connectDB();
    await app.listen(PORT)
    console.log(`API Server started on port ${PORT}`);
  } catch (err) {
    console.log("ERR", err);
  }
};

installMiddlewareToServer(app)

connectExpress();
