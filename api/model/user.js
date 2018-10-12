const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    }, 
    password: {
        type: String, 
        required: true, 
        trim: true
    }, 
    address: {
        type: String
    }, 
    phone: {
        type: String
    }
}, {timestamps: true});

userSchema.pre('save', function(next) {
    let user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);