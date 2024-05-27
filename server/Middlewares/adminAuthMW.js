const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const adminAuth = async (req, res, next)=>{
    const authToken = req.headers.authorization.split(" ");
    if(!authToken){
        res.status(401).send({
            success: false,
            message: "Authorization failed."
        })
    }

    try{
        const jwt_decode = jwt.verify(authToken[1], process.env.jwt_secret)
        const userResponse = await User.findById(jwt_decode);
        if(!userResponse){
            res.status(401).send({
                success: false,
                message: "Authorization failed."
            })
        }

        if(userResponse.role.includes('admin')){
            next()
        }
        else{
            res.status(401).send({
                success: false,
                message: "Admin Authorization failed."
            })
        }
    }
    catch(err){
        res.status(500).send({
            success: true,
            message: "Internal Server Error."
        })
    }
}

module.exports=adminAuth