const mongoose = require('mongoose');

const propertyModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sellers"
    },
    price: {
        type: Number,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    //boundary_points: [{
    //}] 
    
    //more to add
});

module.exports = mongoose.model('properties', propertyModel);