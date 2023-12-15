require("dotenv").config();

const { Pool } = require("pg");

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const database = new Pool(dbParams);

database.connect(() => {
  console.log("Connected to database");
});

module.exports = database;
