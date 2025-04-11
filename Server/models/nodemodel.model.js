const mongoose= require("mongoose");

const nodeModel= new mongoose.Schema(
{
	name:{
		type:String,
		required:true,
		toLowerCase:true,
		trim:true,
	},
	type:{
		type:String,
		enum:["hotel","resort","homestay","camps"],
		required:true,
	},
	coordinates:{
		lat:{type:Number,required:true},
		lng:{type:Number,required:true}
	}
});

module.exports=mongoose.model("Node",nodeModel);
