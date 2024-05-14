var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors')
var mongoose = require('mongoose')

var signUpRouter = require('./routes/signUp')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
      origin: [process.env.REACT_APP_URI]  // <== URL of our future React app
    })
  );


app.use('/signUp', signUpRouter)


mongoose
.connect(process.env.MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo 🫡! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo 😣", err));


module.exports = app;
