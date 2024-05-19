const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req, res)=>{
    const {name, email, phone_num, password} = req.body;
    console.log("Reached: ", name, email, phone_num, password)
    try{
        const emailPresent = await User.findOne({email});
        console.log(emailPresent)
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
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const signIn = async (req, res)=>{
    const {data, password} = req.body;
    try{
        const emailPresent = await User.findOne({email: data});
        const phonePresent = await User.findOne({phone_num: data});

        let response = emailPresent || phonePresent;
        if(!response){
            return res.status(401).send({
                success: false,
                message: "Wrong credentials."
            })
        }

        console.log(">>>", response)
        const isVerified = await bcrypt.compare(req.body.password, response.password);
        if(!isVerified){
            return res.status(401).send({
                success: false,
                message: "Wrong credentials."
            })
        }

        const token = jwt.sign({id: response._id}, process.env.jwt_secret);
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
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const getUser = async (req, res)=>{
    try{
        const response = await User.findById(req.body.id)
        .select("-password")
        .populate('seller_id')
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
        return res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: err.message
        });
    }
}

const updateUser = async (req, res)=>{
    try{
        const response = await User.findByIdAndUpdate(req.body.id, req.body, {new:true});
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
        return res.status(500).json({
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
        return res.status(500).json({
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