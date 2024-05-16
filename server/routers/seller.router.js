const router = require('express').Router();
const sellerCtrl = require('../controller/seller.controller');
const {JWTAuth} = require('../Middlewares/jwtAuthMW')

//register seller
router.post('/register', sellerCtrl.createSeller); 

//get user
router.get('/get', JWTAuth, sellerCtrl.getSeller)

//update user
router.patch('/update', JWTAuth, sellerCtrl.updateSeller)

router.patch('/add-property', JWTAuth, sellerCtrl.addProperty)

router.patch('/remove-property', JWTAuth, sellerCtrl.removeProperty)

module.exports=router;