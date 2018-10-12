//modules
const express = require('express');
const Router = express.Router();

const checkAuth = require('../middlewares/auth');

//controller functions
const { signUp, logIn, getUsers, getSingleUser, updateUser, deleteUser } = require('../controllers/user');

//Routes

Router.post('/signup', signUp);

Router.post('/login', logIn);

Router.get('/', checkAuth, getUsers);

Router.get('/:id', checkAuth, getSingleUser);

Router.patch('/:id', checkAuth, updateUser);

Router.delete('/:id', checkAuth, deleteUser);

module.exports = Router;