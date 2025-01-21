const bcrypt = require('bcrypt')
const saltRounds = 12

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

const comparePasswords = async (password, storedPassword )=> {
    const isEqual = await bcrypt.compare(password, storedPassword)
    return isEqual
} 

module.exports = {hashPassword, comparePasswords}