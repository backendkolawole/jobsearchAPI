const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: [50, 'Name cannot be longer than 50 characters']
    }, 
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [3, 'password cannot be less than 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: [true, 'Please provide another email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email']
    }
})


UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.methods.createJWT = async function () {
    return jwt.sign({ userId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: "10d"})
};

UserSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
};

const User = mongoose.model('User', UserSchema)
module.exports = User