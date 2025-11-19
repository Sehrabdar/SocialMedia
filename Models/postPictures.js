import { DataTypes } from "sequelize";
import sequelize from "../Databases/db.js";

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