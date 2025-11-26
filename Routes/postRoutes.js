import express from 'express';
import path from 'path';
import authToken from '../Middleware/auth.js';
import blogpost from '../Models/blogpost.js';
import PostPicture from '../Models/postPictures.js';
import upload from '../Middleware/Configs/multerConfig.js';
import sequelize from '../Database/db.js';
import { url } from 'inspector';

const router = express.Router();

router.post('/postWithPics', authToken, upload.array('images', 5), async(req, res) => {
    const t = await sequelize.transaction();
    try{
        const {title, content} = req.body;
        const userid = req.user.id;
        const post = await blogpost.create({title, content,userid}, {transaction: t});
     
        const pictures = req.files.map(file => ({
            url: file.path,
            postId: post.id
        }));
        await PostPicture.bulkCreate(pictures, {transaction: t});
        await t.commit();
        res.status(201).json({message: 'Blogpost and pictures posted successfully', post, pictures});
    }catch(error){
        await t.rollback();
        res.status(500).json({message: 'Failed to create post with pictures', error: error.message});
    }
});

export default router;