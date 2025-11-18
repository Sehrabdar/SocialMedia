import express from 'express';
import authToken from '../Middleware/auth.js';
import blogpost from '../Models/Blogpost.js';
import user from '../Models/Users.js';

const router = express.Router();

router.post('/post', authToken, async (req, res) => {
    const {title, content} = req.body;
    const userid = req.user.id;
    const post = await blogpost.create({title, content, userid});
    res.status(201).json(post);
});

router.put('/post/:id', authToken, async(req, res) => {
    const post = await blogpost.findByPk(req.params.id);
    if(!post) return res.status(404).json({message: 'Post not found!'});
    if(post.userid !== req.user.id) return res.status(403).json({message: 'Not Authorized!'});

    const {title, content} = req.body;
    await post.update({title, content});
    res.json(post);
});

router.delete('/post/:id', authToken, async(req, res) => {
    const post = await blogpost.findByPk(req.params.id);
    if(!post) return res.status(404).json({message: 'Post not found!'});
    if(post.userid !== req.user.id) return res.status(403).json({message: 'Not Authorized!'});

    await post.destroy();
    res.json({message: 'Post deleted'});
});

router.get('', async(req, res) => {
    const posts = await blogpost.findAll({include: [{model: user, attributes:['username']}]});
    res.json(posts);
});

export default router;

