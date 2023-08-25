const jwt = require('jsonwebtoken')
const verifytoken = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token , process.env.ACCESS_TOKEN, (err,user)=>{
            if(err) res.status(404).json( { message : "invalid token"}) 
            req.user = user
            next()
        })
    }
}


module.exports = verifytoken