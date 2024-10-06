const {
	Model,
	DataTypes,
} = require('sequelize');
const sequelize = require('../config/database');
class User extends Model{
}

User.init({
	name: DataTypes.STRING,
	email: DataTypes.STRING,
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE,
	deletedAt: DataTypes.DATE,
}, {
	sequelize,
	modelName: 'User',
	tableName: 'users',
});

module.exports = {
	User,
}