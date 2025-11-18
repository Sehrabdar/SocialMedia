import express from 'express';
import bcrypt from 'bcrypt';
import User from '../Models/Users.js';

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

router.get('/:id', async(req, res) => {
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({error: "User not found."});
        }
        else{
            res.json(user);
        }
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
});

router.post('/register', async(req, res) => {
    const {username, email, password} = req.body;
    try{
        if (password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        !/[^A-Za-z0-9]/.test(password)) {
      return res.status(400).json({ error: 'Password does not meet complexity requirements.' });
        }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({username, email, password: hashedPassword})
    res.status(201).json({message: 'User created successfully. ', newUser});
    }
    catch(error){
        if(error.name === 'SequelizeUniqueConstraintError'){
            res.status(409).json({error: 'Username already exists'});
        }
        else if (error.name === 'SequelizeValidationError'){
            res.status(400).json({error: error.message});
        }
        else{
            res.status(500).json({error: 'Internal Server error.'});
        }
    }
    
});

router.post('/login', async(req, res) => {
    const {username, email, password} = req.body;
    const user = await User.findOne({where: {username}});
    if(!user) return res.status(401).json({error: 'Invalid credentials'});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(401).json({error: 'Invalid credentials'});
    
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