const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const register =async (req,res)=>{
    try{
        const newUser = new User({username : req.body.username,
            number : req.body.number,
            email : req.body.email,
            password : cryptojs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        res.status(404).json({message:"error ...."})
    }
}


const login = async (req,res)=>{
    try{
        const user = await User.findOne({ number : req.body.number })
        if (!user) {
            return res.status(401).json({ message: "Invalid number" });
        }
        const decodedPassword = cryptojs.AES.decrypt(user.password,process.env.SECRET_KEY ).toString(cryptojs.enc.Utf8)
        if (decodedPassword !== req.body.password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const {password , ...rest} = user._doc
        const accesstoken = jwt.sign({username : user.username}, process.env.ACCESS_TOKEN)
        res.json({...rest, accesstoken})

    }catch(err){
        res.status(404).json({message:"cannot find user ...."})
    }

}


module.exports = {register, login}