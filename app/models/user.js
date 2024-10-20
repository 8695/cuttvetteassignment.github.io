const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true
    },
    phone: {
        type: 'String',
        required: true
    },
    companyName: {
        type: 'String',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    companySize: {
        type: 'String',
        required: true
    },
    phoneOtp : {
        type: 'String',
    },
    mailOtp:{
        type: 'String',
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;