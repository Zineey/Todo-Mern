const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema


const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
});

// Static signup
userSchema.statics.signup = async function (email, password) {

    if(!email || !password){
        throw Error('Email and Password are required');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is invalid');
    }
    if(password.length < 6){
        throw Error('Password must be at least 6 characters');
    }

    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('User already exists');
    }

    // npm install bcrypt to hash the password if not installed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPassword });
    return user;
};


userSchema.statics.login = async function (email, password) {

    if(!email || !password){
        throw Error('Email and Password are required');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Invalid Email');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Invalid Password');
    }

    return user;

}

module.exports = mongoose.model('User', userSchema);