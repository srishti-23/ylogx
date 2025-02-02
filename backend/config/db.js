// const {Pool}=require('pg')
// const dotenv=require("dotenv")
// dotenv.config({ path: "./config/config.env" });

// const pool = new Pool({
//     user:process.env.DB_USER ,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
//   });
//   console.log("Database Pool:", pool);

//   pool.connect()

//   .then(() => console.log("Connected to PostgreSQL database"))
//   .catch(err => console.error("Database connection error:", err));
//   module.exports = pool
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log("PostgreSQL Connected via Sequelize"))
  .catch(err => console.error("Database connection error:", err));

module.exports = sequelize;
