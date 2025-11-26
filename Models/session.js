import {DataTypes} from 'sequelize';
import sequelize from '../Database/db.js';
import User from './users.js';
const Session = sequelize.define('Session', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ipAddress: {
    type: DataTypes.STRING,
  },
  loginTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  logoutTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
    tableName:'Sessions',
    timestamps: false
});

User.hasMany(Session, { foreignKey: 'userId', as: 'sessions' });
Session.belongsTo(User, { foreignKey: 'userId', as: 'user' });
export default Session;