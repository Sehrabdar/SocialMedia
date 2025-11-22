import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';

import authToken from '../Middleware/auth.js';
import User from '../Models/Users.js';
import config from '../Middleware/Configs/envConfig.js';
import upload from '../Middleware/Configs/multerConfig.js';
import userValidator from '../Middleware/Validations/userName-validator.js';
import passwordValidator from '../Middleware/Validations/password-validator.js';

const router = express.Router();
const saltRounds = 10;

router.get('/', async(req, res) => {
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});

router.patch('/:id', authToken, async(req, res) => {
    try{
    const user = await User.findByPk(req.params.id);
    if(!user){
        res.json({message: 'user not found'});
    }
    if(user.id !== req.user.id) {
        return res.status(403).json({message: 'Not Authorized'});
    }
        user.email = req.body.email != undefined ? req.body.email : user.email;
        user.username = req.body.username != undefined ? req.body.username : user.username;

        await user.save();
        res.json({ message: 'User info updated.', user });
    }catch(error){
    
    res.status(500).json({message: 'Internal Server Error'});
    }   
});


router.get('/profile', authToken, (req, res) => {
    res.json({user: req.user});
})

router.post('/register', upload.single('image'), passwordValidator, userValidator, async(req, res) => {
    const {username, email, password} = req.body;
    const profilePic = req.file ? req.file.path : null;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        profilePic,
    });
    res.status(201).json({message: 'User registration successful', user});
    if(error.name === 'SequelizeUniqueConstraintError'){
            res.status(409).json({error: 'Username already exists'});
        }
        else if (error.name === 'SequelizeValidationError'){
            res.status(400).json({error: error.message});
        }
        else{
            res.status(500).json({error: 'Internal Server error.'});
        }


});

router.post('/login', async(req, res) => {
    const {username, email, password} = req.body;
    const user = await User.findOne({where: {username}});
    if(!user) return res.status(401).json({error: 'Invalid credentials'});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(401).json({error: 'Invalid credentials'});
    
    const token = jwt.sign({id: user.id, username: user.username, email: user.email}, config.jwt.key, {expiresIn: '1h'});

    res.json({message: 'Login Successful', token});
})

router.delete('/:id', async(req, res) => {
    try{
    const {id} = req.params;
    const deleted = await User.destroy({where: {id}});
    if(deleted){
        res.status(200).json({message: `User with id ${id} deleted`});
    }
    else{
        res.status(404).json({error: "User not found"});
    }
}
catch(error){
    res.status(500).json({error: "Something broke"});
}
})

export default router;