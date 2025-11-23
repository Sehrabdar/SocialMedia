import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../Database/db.js";
import user from "./users.js";

const blogpost = sequelize.define('blogpost', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

user.hasMany(blogpost, {foreignKey: 'userid'});
blogpost.belongsTo(user, {foreignKey: 'userid'});
// blogpost.belongsTo(user, {foreignKey: 'userid'});
// blogpost.hasMany(user, {foreignKey: 'userid'});

export default blogpost;
