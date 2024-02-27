const { User, DeletedUser } = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService {
    async register(userData) {
        const {email, username, password} = userData;

        const userExists = await User.findOne({ email: email })
        if(userExists){
            throw new Error('User with that Email already exists!')
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        await user.save()

        const token = this.generateToken(user)
        return { user, token };
    }

    async login(loginData){
        const { username, password } = loginData;

        const user = await User.findOne({ username })
        if (!user) {
            throw new Error("User with that Username doesn't exist")
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Invalid Password')
        }

        const token = this.generateToken(user);
        console.log(token)
        return { user, token };
    }

    generateToken(user) {
        return jwt.sign({user}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    }
}

module.exports = new AuthService();