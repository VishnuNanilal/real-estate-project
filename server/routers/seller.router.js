const router = require('express').Router();
const sellerCtrl = require('../controller/seller.controller');
const {JWTAuth} = require('../Middlewares/jwtAuthMW')

//register seller
router.post('/register', JWTAuth, sellerCtrl.createSeller); 

//get seller
router.get('/get', JWTAuth, sellerCtrl.getSeller)

//update seller
router.patch('/:seller_id', JWTAuth, sellerCtrl.updateSeller)

//add property to seller
router.patch('/:seller_id/add-property', JWTAuth, sellerCtrl.addProperty)

//remove property from seller
router.patch('/:seller_id/remove-property/:property_id', JWTAuth, sellerCtrl.removeProperty)

module.exports=router;