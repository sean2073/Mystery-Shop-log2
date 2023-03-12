const User = require('./User');
const Company = require('./Company');
const Mysteryshops = require('./Mysteryshops');


Mysteryshops.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Mysteryshops.belongsTo(Company, {
    foreignKey: 'companyId',
    onDelete: 'CASCADE'
});
// Company.hasMany(Mysteryshops, {
//     foreignKey: 'companyId',
//     onDelete: 'CASCADE'
// });
Company.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
module.exports = { User, Company, Mysteryshops };