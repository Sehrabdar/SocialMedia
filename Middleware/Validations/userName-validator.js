const userValidator = (req, res, next) => {
    const username = req.body.username;
    if (username.length < 8 ||
        !/[A-Z]/.test(username) ||
        !/[a-z]/.test(username)) {
      return res.status(400).json({ error: 'Username does not meet complexity requirements.' });
    }
    else if(username.length > 20){
        return res.status(400).json({error: 'Username too big'});
    }
    next();
};
export default userValidator;
