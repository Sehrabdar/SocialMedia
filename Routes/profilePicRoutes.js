import express from 'express';
import multer from 'multer';
import path from 'path';
import authToken from '../Middleware/auth.js';
import User from '../Models/Users.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profilepics');

    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
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

router.post('/', authToken, upload.single('image'), async(req, res) => {
    try{
    const user = await User.findByPk(req.user.id);
    if(!user) return res.status(404).json({message: 'User not found.'});
    user.profilePic = req.file.path;
    await user.save();
    res.json({message: 'Profile picture uploaded successfully.', path: req.file.path});
    } catch(error){
        res.status(500).json({message: 'Internal server error'});
    }
});

export default router;
