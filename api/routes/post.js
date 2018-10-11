const express = require('express');
const router = express.Router();

const postControllers = require('../controllers/post');

router.get('/', postControllers.getAllPosts);

router.post('/', postControllers.addPost);

router.delete('/:post', postControllers.deletePost);

router.patch('/:post', postControllers.updatePost);

module.exports = router;