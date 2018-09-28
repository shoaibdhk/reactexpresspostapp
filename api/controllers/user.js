const mongoose = require('mongoose');
const User = require('../model/user');

const signUp = (req, res, next) => {
    if(req.body.username && req.body.email && req.body.password) {

        User
            .findOne({ email: req.body.email })
            .then(result => {
                
                if(!result) {

                    User
                        .findOne({ username: req.body.username })
                        .then(usernameResponse => {
                            if(!usernameResponse) {
                                
                                if(req.body.password.length < 6) {

                                    res.status(400).json({
                                        message: "Your password should be minimum 6 character long!"
                                    });

                                } else {

                                    const newUser = new User({
                                        username: req.body.username, 
                                        email: req.body.email, 
                                        password: req.body.password
                                    });
    
                                    return newUser.save();

                                }
                                

                            } else {
                                res.status(409).json({
                                    message: "This username already exists! Please try another."
                                });
                            }
                        })

                } else {
                    res.status(409).json({
                        message: "This email already exists! Please try another."
                    });
                }
            })
            .then(user => {
                res.status(201).json({
                    message: "User created successfully!", 
                    user
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Internal server error", 
                    error: err
                });
            });
    }


}

const logIn = (req, res, next) => {

}

const getUsers = (req, res, next) => {
    User
        .find()
        .then(result => {
            res.json({
                "Total Users": result.length, 
                result
            });
        })
        .catch(err => {
            res.json(err);
        })
}

const getSingleUser = (req, res, next) => {
    
}

const updateUser = (req, res, next) => {
    
}

const deleteUser = (req, res, next) => {

}

module.exports = {
    signUp, logIn, getUsers, getSingleUser, updateUser, deleteUser
}