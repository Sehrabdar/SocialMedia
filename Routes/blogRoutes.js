import express from 'express';
import authToken from '../Middleware/auth.js';
import blogpost from '../Models/Blogpost.js';

const router = express.Router();

router.post('/post', authToken, async (req, res) => {
    const {title, content} = req.body;
    const userid = req.user.id;
    const post = await blogpost.create({title, content, userid});
    res.status(201).json(post);
});

export default router;

