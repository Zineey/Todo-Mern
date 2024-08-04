const User = require('../Models/userModel');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

// User Login
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({email, token});
    }catch (error){
        res.status(400).json({error: error.message});
    }
}

// User Signup

const signupUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const user = await User.signup(email, password, firstName, lastName);

        // Create Token
        const token = createToken(user._id)


        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {signupUser, loginUser};