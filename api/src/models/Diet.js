const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('diet', {
        iD: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        }
    }, {
        timestamps: false
    })
}