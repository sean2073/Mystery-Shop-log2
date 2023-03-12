const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
var moment = require('moment'); // require
moment().format(); 
// create our Company model
class Company extends Model { }
// create fields/columns for Post model
Company.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        company_name: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        payment_date: {
                allowNull: false,
                type: DataTypes.DATEONLY,
                get: function () {
                    return moment(this.getDataValue('payment_date')).format('Do')
                    // moment().format("MMM Do YY");  
                }
             },
        payment_date:{
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "30th"
        },
        paypal: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
            
        //     references: {
        //         model: 'user',
        //         key: 'id'
        //     }
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'company'
    }
);

module.exports = Company;