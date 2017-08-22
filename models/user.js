var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var user=new Schema({
	email: {
		type: String
	},
	password: {
		type: String
	}
	

})
module.exports=mongoose.model('user',user);