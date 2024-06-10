const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    owned_properties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "properties"
    }]
    //more to add
});

module.exports = mongoose.model('users', userSchema);