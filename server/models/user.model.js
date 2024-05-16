const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_num: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sellers"
    }
    //more to add
});

module.exports = mongoose.model('users', userModel);