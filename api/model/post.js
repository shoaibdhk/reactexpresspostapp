const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    postBody: {
        type: String, 
        required: [true, "Please write something to post"]
    },
    time: {
        type: Date, 
        default: Date.now
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);