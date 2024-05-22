const router = require('express').Router();
const propertyCtrl = require('../controller/property.controller')

router.get('/get-all', propertyCtrl.getAllProperties); 
router.get('/:property_id', propertyCtrl.getProperty);

module.exports=router