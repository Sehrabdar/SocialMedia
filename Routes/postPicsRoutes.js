import express from 'express';
import multer from 'multer';
import path from 'path';
import authToken from '../Middleware/auth.js';
import User from '../Models/users.js';
import PostPicture from '../Models/postPictures.js';
import blogpost from '../Models/blogpost.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/post_pics');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg'){
        cb(new Error('Only JPEG images are allowed'), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1*1024*1024},
    fileFilter: fileFilter
});


const router = express.Router();

router.post('/:id/pictures', authToken, upload.array('images', 5), async(req, res) => {
    try{
        const post = await blogpost.findByPk(req.params.id);
        if(!post) return res.status(404).json({message: 'Post not found!'});
        if(post.userid !== req.user.id) return res.status(403).json({message: 'Not authorized to upload pictures for this post.'});

        const pictures = req.files.map(file => ({
            url: file.path,
            postId: post.id,
        }));
        await PostPicture.bulkCreate(pictures);
        res.json({message: 'Pictures posted successfully.', pictures});
    }
    catch(error){
        return res.status(500).json({message: 'Internal Server error.'});
    }
});

export default router;
