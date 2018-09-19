const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    postBody: {
        type: String, 
        required: [true, "Please write something to post"]
    }, 
    username: {
        type: String, 
        required: [true, "What is your username? "], 
        unique: ["Sorry, this username is already used by someone! Please try using another one.", true]
    },
    time: {
        type: Date, 
        default: Date.now
    }, 
    reactions: {
        likes: {
            count: {
                type: Number, 
                default: 0
            }
        }
    }, 
    comments: {
        type: Array
    }
});

module.exports = mongoose.model('posts', postSchema);