var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var address=new Schema({
    ip: []
	

})
module.exports=mongoose.model('address',address);