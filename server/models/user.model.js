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
    admin: {
        type: Boolean,
        required: true
    }
    //more to add
});

module.exports = mongoose.model('users', userSchema);