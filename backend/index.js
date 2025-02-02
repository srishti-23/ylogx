const dotenv = require("dotenv");
const express = require("express");
const app = express();
const sequelize  = require('./config/db');
const stageRoutes = require('./routes/stageRoutes');
const roleRoutes = require('./routes/roleRoutes');
const statusRoutes = require('./routes/statusRoutes');
// const pool = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/user");
// const initializeDB = require("./config/initDb")

dotenv.config({ path: "./config/config.env" });

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
// initializeDB();
sequelize.sync({ alter: true}) 
  .then(() => console.log("Database Synced Successfully"))
  .catch(err => console.error("Error syncing models:", err));

app.use("/api", userRouter);
app.use('/api/stages', stageRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/roles', roleRoutes);

app.get("/", (req, res) => {
  res.status(201).send("Welcome");
});
app.get("/test-db", async (req, res) => {
  try {
    const result = await sequelize.query("SELECT NOW();");
    res.json({ message: "Database connected", time: result[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server connected on Port ${PORT}`);
});
