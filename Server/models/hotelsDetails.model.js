const mongoose=require("mongoose");

const hotelDetail=new mongoose.Schema({

	node:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Node",
		required:true
	},
	image:String,
	description:String,
	price:Number,
	rating:Number,
	roomType:{type:String,enum:["single","delux"]},
	address:String

})

module.exports=mongoose.model("hoteldetails",hotelDetail);
