const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')
const bcrypt = require('bcryptjs')

const register = async (req, res)=> {
    const {name, email, password} = req.body
    if (!name || !email || !password) {
        return res.status(400).json({msg: "Please provide username, email and password"})
    }
    const user = await User.create(req.body)
    const token = await user.createJWT()
    return res.status(StatusCodes.CREATED).json({user: {name: user.name, email: user.email, lastName: user.lastName, location: user.location, token}})
}

const login = async (req, res)=> {
    const {email, password} = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isCorrect = await user.comparePasswords(password)
    if (!isCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = await user.createJWT()

    return res.status(StatusCodes.OK).json({user: {name: user.name, email: user.email, lastName: user.lastName, location: user.location, token}})

}



module.exports = {login, register}