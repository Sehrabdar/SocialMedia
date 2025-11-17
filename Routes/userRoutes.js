import express from 'express';
import User from '../Models/Users.js';

const router = express.Router();

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

router.post('/', async(req, res) => {
    try{
        const {username, email} = req.body;
        const newUser = await User.create({username, email});
        res.status(201).json(newUser);
    }
    catch(error){ 
        res.status(400).json(`Error Occured ${error}`);
    } 
});

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