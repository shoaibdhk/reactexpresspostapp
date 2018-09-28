const express = require('express');
const mongoose = require('mongoose');
const bodyPerser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// Routers
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

//initiate the Express app
const app = express();

//connect mongoDB
mongoose.connect('mongodb://imran:postapp1@ds237932.mlab.com:37932/postapp', { useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);
//to see the request log in the console
app.use(morgan('dev'));

//to parse request body, used bodyParser
app.use(bodyPerser.json());
app.use(bodyPerser.urlencoded({ extended: false }));

//solving CORS problem
app.use(cors());


//use Routes
//This is post route
app.use('/posts', postRoutes);

app.use('/user', userRoutes);



//this is Root route
app.use('/', (req, res, next) => {
    res.json({
        message: 'Please navigate to /posts'
    });
})

//Export the app
module.exports = app;