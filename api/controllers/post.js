const mongoose = require('mongoose');
const Post = require('../model/post');

const addPost = (req, res, next) => {
    const post = new Post({
        _id: new mongoose.Types.ObjectId(), 
        postBody: req.body.postBody, 
        username: req.body.username
    });

    console.log(req.body);

    post
        .save()
        .then(result => {
            console.log(result);
            res.json({
                newPost: result
            });
        })
        .catch(err => {
            error: err
        });
}

const getAllPosts = (req, res, next) => {
    Post
        .find()
        .then(result => {
            res.json({
                posts: result
            });
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
}

const deletePost = (req, res, next) => {
    Post
        .remove({_id: req.params.post})
        .then(result => {
            res.json({
                message: "Post deleted"
            });
        })
        .catch(err => {
            error: err
        });
}

const updatePost = (req, res, next) => {
    Post
        .update({_id: req.params.post}, {$set: req.body})
        .then(result => {
            res.json({
                post: result
            });
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
}

module.exports = {
    addPost, 
    getAllPosts, 
    deletePost, 
    updatePost
}