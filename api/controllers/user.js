const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../model/user');
const { secret } = require('../config/config');

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
    
                                    newUser
                                        .save()
                                        .then(user => {

                                            const token = jwt.sign({
                                                username: req.body.username, 
                                                userId: user._id
                                            }, config.secret, { expiresIn: "3h" });
                                            
                                            res.status(201).json({
                                                message: "User created successfully!", 
                                                user, 
                                                token
                                            });
                                        })

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
            .catch(err => {
                res.status(500).json({
                    message: "Internal server error", 
                    error: err
                });
            });
    } else {
        res.status(400).json({
            message: "Seems you entered something invalid, Please provide all nedded information correctly!"
        });
    }


}

const logIn = (req, res, next) => {
    const input = req.body.username ? { username: req.body.username } : { email: req.body.email }
    
    User
        .findOne(input)
        .then(user => {
            
            if(!user) {
                return res.status(404).json({
                    message: "No user found! Please provide right/valid information"
                });
            }

            bcrypt.compare(req.body.password, user.password, function(err, response) {
                if(err || !response) {
                    return res.status(400).json({
                        message: "Password doesn't match"
                    });
                }

                if(response) {
                    const token = jwt.sign({
                        username: req.body.username, 
                        userId: user._id
                    }, secret, { expiresIn: "3h" });

                    res.status(200).json({
                        message: "Logged in successfully", 
                        authorization: token
                    });
                }
            });

        })
        .catch(err => {
            res.status(500).json({
                message: "Internal Server Error!"
            });
        });
}

//this controller is only for a super admin who can watch all the users information
const getUsers = (req, res, next) => {
    User
        .find()
        .select("email username password")
        .then(users => {
            
            if(users.length > 0) {

                res.status(200).json({
                    "Total User(s)": users.length, 
                    users
                });
            } else {
                res.status(200).json({
                    message: "Sorry! There have no user!"
                });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

const getSingleUser = (req, res, next) => {
    const id = req.params.id;

    User
        .findById(id)
        .then(user => {
            
            if(req.decoded.userId !== id) {
                return res.status(203).json({
                    message: "I'm affraid, you are not authorized person to watch this information!"
                });
            }

            res.status(200).json({
                user
            });
        })
        .catch(err => {
            error: err
        });
}

const updateUser = (req, res, next) => {
    const id = req.params.id;

    if(req.decoded.userId !== id) {
        return res.status(203).json({
            message: "I'm affraid, you are not authorized person to update this information!"
        });
    }

    User
        .updateOne({ _id: id }, { $set: req.body })
        .then(user => {
            res.json({
                message: "User information updated successfully!", 
                user
            });
        })
        .catch(err => {
            
            res.json({
                errorMessage: err
            });
        });
}

const deleteUser = (req, res, next) => {
    const id = req.params.id;

    if(req.decoded.userId !== id) {
        return res.status(203).json({
            message: "I'm affraid, you are not authorized person to Delete this information!"
        });
    }

    User
        .findOneAndDelete({_id: id})
        .select("email username")
        .then(response => {
            res.status(200).json({
                message: `${response.username || response.email} is successfully DELETED!`
            });
        })
        .catch(err => {
            res.status(404).json(err);
        });
}

module.exports = {
    signUp, logIn, getUsers, getSingleUser, updateUser, deleteUser
}