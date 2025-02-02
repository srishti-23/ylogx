const pool = require("./db"); // Import the PostgreSQL pool
const fs = require("fs");
const path = require("path");

const sqlFilePath = path.join(__dirname, "schema.sql"); // Path to SQL file

const initializeDB = async () => {
  try {
    const sql = fs.readFileSync(sqlFilePath, "utf8"); // Read SQL file
    await pool.query(sql); // Execute SQL script
    console.log("Database tables created successfully!");
  } catch (err) {
    console.error("Error initializing database:", err.message);
  }
};

module.exports = initializeDB;
