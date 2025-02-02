const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Stage = require('./stage');

const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  candidates: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Role.belongsTo(Stage, { foreignKey: 'stageId' });
Stage.hasMany(Role, { foreignKey: 'stageId' });

module.exports = Role;