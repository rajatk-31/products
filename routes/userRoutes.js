//requiring all modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('../config'); // get our config file
var user = require('../models/user'); // get our mongoose model
var product = require('../models/product') //get product module


var userRoutes = express.Router()
//getting all products
userRoutes.get('/products', function(req, res){
	    product.find({ status: "show" }, function(err, data) {
        if (err) {
        	res.status(500).json({
            success: false,
            msg: "Database error"
        })
        }
        else {
            res.json({
                success: true,
                data: data
            })
        }
    })

})


//exporting userRoute

module.exports = userRoutes;