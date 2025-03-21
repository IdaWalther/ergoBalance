const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const saltRounds = 12

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

const comparePasswords = async (password, storedPassword )=> {
    console.log('Inne i comparePasswords')
    const isEqual = await bcrypt.compare(password, storedPassword)
    return isEqual
}

const generateJWT = async (user) => {
    const payload = {
        sk: user.sk,
        isUser: true,
        username: user.username
    }

    console.log('Payload', payload)

    const token = jwt.sign(payload, process.env.SECRET_ACCESS_KEY)
    console.log(token)
    return token
}





module.exports = {hashPassword, comparePasswords, generateJWT}