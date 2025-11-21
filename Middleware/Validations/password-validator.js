const passwordValidator = (req, res, next) =>{
    const password = req.body.password;
    if (password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        !/[^A-Za-z0-9]/.test(password)) {
      return res.status(400).json({ error: 'Password does not meet complexity requirements.' });
        }
    else if(password.length > 20) return res.status(400).json({error: 'Password too long'});
    next();
}
export default passwordValidator;