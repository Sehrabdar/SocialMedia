import {DataTypes, Model} from 'sequelize';
import sequelize from '../Database/db.js';
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }, 
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    profilePic: {
       type: DataTypes.STRING,
       allowNull: true,
    }
    
}, {
    timestamps: true,
});

export default User;