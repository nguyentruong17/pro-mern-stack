const { MongoClient } = require("mongodb");
require("dotenv").config();

const DB_URL = process.env.DB_URL || "mongodb://localhost/issuetracker";
let db;

const connectDB = async () => {
  const client = new MongoClient(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  console.log(`DB Connected @ ${DB_URL}`);
  db = client.db();
};

const getDB = () => {
  return db
}

module.exports = { getDB, connectDB };
