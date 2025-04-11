const mongoose= require("mongoose");

const userModel= new mongoose.Schema({
	username:{
		type:String,
		required:true,
		lowercase:true,
		trim:true,
		unique:true,
	},
	firstname:{
		type:String,
		trim:true,
		lowercase:true,
		required:true,
	},
	lastname:{
		type:String,
		trim:true,
		lowercase:true,
		required:true
	},
	email:{
		type:String,
		required:true,
		lowercase:true,
		trim:true,
	},
	password:{
		type:String,
		required:true,
		trim:true,
	},
});


module.exports=mongoose.model("User",userModel);
