const jwt = require('jsonwebtoken')

const JWTAuth = async (req, res, next)=>{
    try{
        let authToken = req.headers.authorization.split(" ");
        if(authToken[0] !== "Bearer"){
            return req.status(401).send({
                success: false,
                message: "Authorization failed."
            })
        }

        const jwt_decode = jwt.verify(authToken[1], process.env.jwt_secret );
        if(jwt_decode){
            req.body.id=jwt_decode.id;
            next();
        }
        else{
            return req.status(401).send({
                success: false,
                message: "Authorization failed."
            })
        }
    }
    catch(err){
        console.log("Error: ",err);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports={JWTAuth}