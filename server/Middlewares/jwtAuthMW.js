const jwt = require('jsonwebtoken')

const JWTAuth = async (req, res, next)=>{
    try{
        let authToken = req.headers.authorization.split(" ");
        if(authToken[0] !== "Bearer"){
            req.body.id=null;
            next();
        }

        const jwt_decode = jwt.verify(authToken[1], process.env.jwt_secret );
        if(jwt_decode){
            req.body.id=jwt_decode.id;
        }
        else{
            req.body.id=null;
        }
        next();
    }
    catch(err){
        console.log("Error: ",err);
    }
}

module.exports={JWTAuth}