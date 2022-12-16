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
    value: {
        type: DataTypes.INTEGER,
    }
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

Status.hasMany(Delivery)
Delivery.belongsTo(Status)

module.exports = {
    Delivery,
    Status
}