const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    iD: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dishSummary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pap: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false
  });
};