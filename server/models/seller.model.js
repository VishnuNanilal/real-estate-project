const mongoose = require('mongoose');

const sellerModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "property",
        required: true
    }]
    //more to add
});

module.exports = mongoose.model('sellers', sellerModel);