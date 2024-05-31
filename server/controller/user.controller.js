const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req, res)=>{
    console.log("sdssd")
    const {name, email, phone_num, password} = req.body;
    try{
        const emailPresent = await User.findOne({email});
        if(emailPresent) 
            return res.status(409).send({
                success: false,
                error: "Email already in use."
        })

        const phonePresent = await User.findOne({phone_num});
        if(phonePresent) 
            return res.status(409).send({
                success: false,
                error: "Phone number already in use."
        })

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const response = await User.create(req.body);
        response.password = "###"
        if(response){
            return res.status(201).send({
                success: true,
                data: response,
                message: "User created."
            })
        }
        else{
            return res.status(400).send({
                success: false,
                error: "User creation failed on DB."
            })
        }
        
    }    
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const signIn = async (req, res)=>{
    const {data, password} = req.body;
    try{
        let phonePresent=null;
        let emailPresent=null;
        if(typeof data === "Number"){
            phonePresent = await User.findOne({phone_num: data});
        }
        else{
            emailPresent = await User.findOne({email: data});
        }

        let response = emailPresent || phonePresent;
        if(!response){
            return res.status(401).send({
                success: false,
                message: "Wrong credentials."
            })
        }

        const isVerified = await bcrypt.compare(req.body.password, response.password);
        if(!isVerified){
            return res.status(401).send({
                success: false,
                message: "Wrong credentials."
            })
        }
        // console.log("User fetched with current data ", response);
        // console.log("Sign in data, response.id: ", response.id)
        const token = jwt.sign({id: response.id}, process.env.jwt_secret);
        // console.log("Token: ", token)
        if(token){
            return res.status(201).send({
                success: true,
                data: token,
                message: "User signed in."
            })
        }
        else{
            return res.status(403).send({
                success: false,
                error: "User sign in failed."
            })
        }
        
    }    
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const getUser = async (req, res)=>{
    try{
        const response = await User.findById(req.body.id)
        .populate('seller_id')
        .select("-password")
        .exec();
        
        if(response){
            return res.status(200).send({
                success: true,
                message: "User data fetched.",
                data: response,
            })
        }
        else{
            return res.status(401).send({
                success: false,
                error: "Authentication failed."
            })
        }
        
    }    
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const updateUser = async (req, res)=>{
    try{
        const response = await User.findByIdAndUpdate(req.body.id, req.body, {new:true})
                        .populate("seller_id").exec();
        if(response){
            return res.status(200).send({
                success: true,
                message: "User data updated.",
                data: response,
            })
        }
        else{
            return res.status(401).send({
                success: false,
                error: "Authentication failed."
            })
        }
        
    }    
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const deleteUser = async (req, res)=>{
    try{
        const response = await User.findByIdAndDelete(req.body.id);
        if(response){
            return res.status(200).send({
                success: true,
                message: "User data deleted.",
            })
        }
        else{
            return res.status(401).send({
                success: false,
                error: "Authentication failed."
            })
        }
        
    }    
    catch(err){
        return res.status(500).send({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

module.exports = {
    register,
    signIn,
    getUser,
    updateUser,
    deleteUser
}