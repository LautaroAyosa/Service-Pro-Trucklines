const { DataTypes } = require('sequelize')
const { sequelize } = require('./index')

const Delivery = sequelize.define('deliveries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    deliveryId: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    division: { 
        type: DataTypes.STRING,
    },
    value: {
        type: DataTypes.FLOAT,
    },
    date: {
        type: DataTypes.DATE,
    },
    payed: {
        type: DataTypes.BOOLEAN,
    },
})

const Status = sequelize.define('status', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false
})

Delivery.belongsTo(Status, { foreignKey: 'statusId' });
Status.hasMany(Delivery, { foreignKey: 'statusId' });

module.exports = {
    Delivery,
    Status
}