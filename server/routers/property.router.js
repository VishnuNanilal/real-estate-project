const router = require('express').Router();
const propertyCtrl = require('../controller/property.controller')

router.get('/get-all', propertyCtrl.getAllProperties); 
router.get('/:property_id', propertyCtrl.getProperty);
router.patch('/set-buyer/:property_id', propertyCtrl.updatePropertySetNewBuyer);

module.exports=router