// Requiring all the modules that will be used in the simple server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config')
var registrationLogin = require('./routes/registrationLogin')  //requiring registrationRoute
var jwtVerify = require('./routes/jwtVerify')
var productRoutes = require('./routes/productRoutes')          //requiring productRoute
var userRoutes = require('./routes/userRoutes')				   //requiring userRoute


var port = process.env.PORT || 8000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/',registrationLogin)  //using registrationRoute
app.use('/api',productRoutes)   //using productRoute
app.use('/a',userRoutes)        //using userRoute

//PORT listen
app.listen(port);
console.log('port running at http://localhost:' + port);
