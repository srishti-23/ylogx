// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Stage = sequelize.define('Stage', {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   statuses: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] }
// }, { timestamps: true });

// module.exports = Stage;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Use the configured Sequelize instance

const Stage = sequelize.define("Stage", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Stage;

