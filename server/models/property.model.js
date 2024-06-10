const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    boundary_points: {
        type: [[Number]]
    }, 
    area: {
        type: Number,
        required: true
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    minimum_increment: {
        type: Number,
        default: 1000
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    closing_time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', "bidPending", 'sold'],
        default: 'pending',
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
});

module.exports = mongoose.model('properties', propertySchema);