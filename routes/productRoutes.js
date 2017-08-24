//requiring all modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var user = require('../models/user'); // get our mongoose model
var product = require('../models/product')
var address = require('../models/address') //get address module
var registrationLogin = require('../routes/registrationLogin')
var jwtVerify = require('../routes/jwtVerify')

var productRoutes = express.Router()
//for authentication
productRoutes.use(function(req, res, next) {
  jwtVerify(req, res, next)
})

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
//Adding a new Product
productRoutes.post('/product', cors(corsOptions), function(req, res) {
  if (!req.body.name) {
    res.json({
      success: false,
      msg: "Data not provided"
    })
  } else {
    var newProduct = new product({
      email: req.decoded._doc.email,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    })
    newProduct.save(function(err, data) {
      if (err) {
        res.status(500).json({
          success: false,
          msg: "Database error"
        })
      } else {
        res.json({
          success: true,
          data: data,
          decoded: req.decoded
        });
      }
    });
  }
});



//Editing existing Product
productRoutes.put('/product', cors(corsOptions), function(req,res){
	if(!req.body.id){
		res.json({
			success: false,
			msg: "No data Provided"
		})
	} else {
		var nproduct= {
			email: req.decoded._doc.email,
			name: req.body.name,
			price: req.body.price,
			category: req.body.category
		}
		product.findOneAndUpdate({_id: req.body.id}, {$set : nproduct}, { new: true}, function(err, data){
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
	}
});

//removing product

productRoutes.delete('/product', cors(corsOptions), function(req, res){
    console.log('product',req.body)
  if (!req.body.id) {
        res.json({
            success: false,
            msg: "Data not provided"
        })
    } else {
        product.findById({ _id: req.body.id }, function(err, data) {
            if (err) res.status(500).json({
                success: false,
                msg: "Database error"
            })

            else {
                data.status = 'deleted';
                data.save(function(err, newData) {
                    if (err) res.status(500).json({
                        success: false,
                        msg: "Database error"
                    })
                    else {
                        res.json({
                            success: true,
                            data: newData
                        })
                    }
                })
            }
        })
    }
})


productRoutes.get('/product', cors(corsOptions), function(req, res) {
    product.find({ $and:[{email: req.decoded._doc.email},{status: "show"}] },  function(err, data) {
        if (err) res.status(500).json({
            success: false,
            msg: "Database error"
        })

        else {
            res.json({
                success: true,
                data: data
            })
        }
    })

})



//exporting productRoute
module.exports = productRoutes;