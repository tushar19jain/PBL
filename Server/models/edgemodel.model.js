const mongoose=require("mongoose");

const edgeModel= new mongoose.Schema(
{
	from:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Node",
		required:true,
	},

	to:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Node",
		required:true,
	},
	distance:{
		type:Number,
		required:true
	}
	
})


module.exports=mongoose.model("Edge",edgeModel);
