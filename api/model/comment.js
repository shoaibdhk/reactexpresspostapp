const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    body: {
        type: String, 
        required: true
    }, 
    user: {
        required: true, 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }, 
    post: {
        require: true, 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post"
    }
});

module.exports = mongoose.model('Comment', commentSchema);