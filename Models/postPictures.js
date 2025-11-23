import { DataTypes } from "sequelize";
import sequelize from "../Database/db.js";

const PostPicture = sequelize.define('postPicture', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

export default PostPicture;