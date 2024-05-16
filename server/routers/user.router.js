const router = require('express').Router();
const userCtrl = require('../controller/user.controller');
const {JWTAuth} = require('../Middlewares/jwtAuthMW')
//register user
router.post('/register', userCtrl.register); 

//sign-in user
router.get('/sign-in', userCtrl.signIn);

//get user
router.get('/me', JWTAuth, userCtrl.getUser)

//update user
router.patch('/me', JWTAuth, userCtrl.updateUser)

//delete user
router.delete('/me', JWTAuth, userCtrl.deleteUser)

module.exports=router;