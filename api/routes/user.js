//modules
const express = require('express');
const Router = express.Router();

const checkAuth = require('../middlewares/auth');

//controller functions
const User = require('../controllers/user');

//Routes

Router.post('/signup', User.signUp);

Router.post('/login', User.logIn);

Router.get('/', checkAuth, User.getUsers);

Router.get('/:id', User.getSingleUser);

Router.patch('/:id', User.updateUser);

Router.delete('/:id', User.deleteUser);

module.exports = Router;