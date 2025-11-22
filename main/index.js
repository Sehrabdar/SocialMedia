import { log, error } from 'console';
import express from 'express';
import path from 'path';
import fs from 'fs';
import userRoutes from '../Routes/userRoutes.js';
import sequelize from '../Databases/db.js';
import blogRoutes from '../Routes/blogRoutes.js';
import pictureRoutes from '../Routes/postPicsRoutes.js';
import user from '../Models/Users.js';
import blogpost from '../Models/Blogpost.js';
import PostPicture from '../Models/postPictures.js';




const app = express();
const port = 3000;
app.use(express.json());
app.use('/users', userRoutes);
app.use('/posts', blogRoutes);
app.use('/post-pics', pictureRoutes);
app.use('/uploads', express.static('uploads'));


const uploadPath = path.join(process.cwd(), 'uploads/profilepics');
const uploadPath2 = path.join(process.cwd(), 'uploads/post_pics');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}
if (!fs.existsSync(uploadPath2)) {
  fs.mkdirSync(uploadPath2, { recursive: true });
}

(async() => {
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await sequelize.sync({alter : true});
        console.log("Database synced successfully."); 
    }
    catch (error){
        console.error('Unable to connect to the database', error);
    }
})();

app.listen(port, () => {
    console.log("Server has started");
});

