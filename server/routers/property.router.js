const router = require('express').Router();
const adminAuth = require('../Middlewares/adminAuthMW')
const propertyCtrl = require('../controller/property.controller')
router.post('/', propertyCtrl.createProperty)

router.get('/get-all', propertyCtrl.getAllProperties); 
router.get('/:property_id', propertyCtrl.getProperty);

router.patch('/set-buyer/:property_id', propertyCtrl.updatePropertySetNewBuyer);
router.patch('/to-approve/:property_id', adminAuth, propertyCtrl.toApproveStatus);
router.patch('/to-bid-pending', adminAuth, propertyCtrl.toBidPendingStatus);
router.patch('/to-sold', adminAuth, propertyCtrl.toSoldStatus);
router.patch('/:property_id', propertyCtrl.updateProperty)

module.exports=router