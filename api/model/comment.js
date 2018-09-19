const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    body: {
        type: String, 
        required: true
    }, 
    username: {
        required: true, 
        type: String
    }
});

module.exports = mongoose.model('comments', commentSchema);