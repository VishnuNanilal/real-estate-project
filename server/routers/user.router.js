const router = require('express').Router();
const userCtrl = require('../controller/user.controller');
const {JWTAuth} = require('../Middlewares/jwtAuthMW')
const {AdminAuth}  = require('../Middlewares/adminAuthMW')

//register user
router.post('/register', userCtrl.register); 

//sign-in user
router.post('/sign-in', userCtrl.signIn);

//get user
router.get('/me', JWTAuth, userCtrl.getUser)

//get all users
router.get('/get-all', userCtrl.getAllUsers)

//update user
router.patch('/me', JWTAuth, userCtrl.updateUser)

//push notification
router.patch('/notification/push', JWTAuth, userCtrl.pushNotification)

//pull notification
router.patch('/notification/pop/:notification_id', JWTAuth, userCtrl.popNotification)

//delete user
router.delete('/me', JWTAuth, userCtrl.deleteUser)

//update user add property
router.patch('/me/add-property/:property_id', JWTAuth, userCtrl.UpdateUserAddProperty)

module.exports=router;