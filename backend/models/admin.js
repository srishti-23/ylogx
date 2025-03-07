const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); 

const Admin = sequelize.define("Admin", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { 
    type: DataTypes.ENUM("Admin", "SuperAdmin"), // Ensuring valid roles
    allowNull: false,
    defaultValue: "Admin" // Default role assignment
  }
}, { timestamps: true });



module.exports = Admin;
