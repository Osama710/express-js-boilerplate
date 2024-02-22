const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database.config');
const { Users } = require('./users.model');

class FailedLoginAttempt extends Model {
}

const json_schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};


FailedLoginAttempt.init(json_schema, { sequelize, paranoid: true, timestamps: true, underscored: true, createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' });
FailedLoginAttempt.belongsTo(Users, { foreignKey: 'user_id' });

exports.FailedLoginAttempt = FailedLoginAttempt;
