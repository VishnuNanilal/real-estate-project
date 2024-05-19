const router = require('express').Router();
const propertyCtrl = require('../controller/property.controller')

router.get('/get-all', propertyCtrl.getAllProperties); 

module.exports=router