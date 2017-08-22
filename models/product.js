var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var product=new Schema({
	email: {
		type: String,
	},
	name: {
		type: String,
	},
	price: {
		type: Number,

	},
	category: {
		type: String
	},
	status: {
        type: String,
        default: 'show'
    }

})
module.exports=mongoose.model('product',product);