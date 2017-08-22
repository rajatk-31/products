//requiring all modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('../config'); // get our config file
var user = require('../models/user'); // get our mongoose model
var product = require('../models/product') //get product module
var address = require('../models/address') //get i[address] module
var cors = require('cors');
var userRoutes = express.Router()
var whitelist=[]

// var corsOptionsDelegate = function (req, callback) {
//     var corsOptions;
//     console.log(req.header('Postman-Token'))
//     if (true) {
//       corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response 
//     }else{
//       corsOptions = { origin: false } // disable CORS for this request 
//     }
//     callback(null, corsOptions) // callback expects two parameters: error and options 
//   }

var corsOptions = {
  origin: function (a, callback) {
    console.log(a);
    address.find({}, function(err, data) {
            console.log(data)
                whitelist= data[0].ip
                if (whitelist.indexOf(a) !== -1 || !a) {
                    callback(null, true)
                  } else {
                    callback(null,false)
                  }
        })
    
  }
}



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

userRoutes.get('/address', function(req, res){
    address.find({}, function(err, data) {
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


userRoutes.post('/addip', cors(corsOptions), function(req, res){
    address.update({_id: req.body.id}, {$push: {ip: req.body.ip}}, {upsert: true}, function(err, data){
     if(err) {
        res.status(500).json({
            success: false,
            msg: "Database error"
            })
        } else {
            res.json({
            success: true,
            data: data,
            decoded: req.decode
            })
        }
    })
})



//exporting userRoute

module.exports = userRoutes;