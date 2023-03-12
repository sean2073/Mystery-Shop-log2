const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Shops model
class Mysteryshops extends Model { }
// create fields/columns for Post model
Mysteryshops.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // company_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'company',
        //         key: 'id'
        //     }
        // },
        location: {
            type: DataTypes.STRING(1234),
            allowNull:false
        },
        date_performed:{
            type: DataTypes.DATEONLY,
            allowNull: false

        },
        fee:{
            type: DataTypes.DECIMAL(10,2),
            allowNull:false,
            defaultValue: 0
        },
        reimbursement_due:{
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0

        },
        total:{
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0

        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        check_no:{
            type: DataTypes.TEXT,
             allowNull: true

        },
        check_date:{
            type: DataTypes.DATEONLY,
            allowNull: true

        }

        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'mysteryshops'
    }
);

module.exports = Mysteryshops;