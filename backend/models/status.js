const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Stage = require('./stage');

const Status = sequelize.define('Status', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stageId: {
    type: DataTypes.INTEGER,
    references: {
      model: Stage,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

Stage.hasMany(Status, { foreignKey: 'stageId', onDelete: 'CASCADE' });
Status.belongsTo(Stage, { foreignKey: 'stageId' });

module.exports = Status;
