const router = require('express').Router();
const adminAuth = require('../Middlewares/adminAuthMW')
const propertyCtrl = require('../controller/property.controller')
router.post('/', propertyCtrl.createProperty)

router.get('/get-all', propertyCtrl.getAllProperties); 
router.get('/:property_id', propertyCtrl.getProperty);

router.patch('/set-buyer/:property_id', propertyCtrl.updatePropertySetNewBuyer);
router.patch('/change-status/:property_id', adminAuth, propertyCtrl.changeStatus);
router.patch('/:property_id', propertyCtrl.updateProperty)

module.exports=router