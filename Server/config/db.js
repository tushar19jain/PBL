const mongoose= require("mongoose");


const mongoConnect= async()=>{
	try{
		await mongoose.connect(`${process.env.MONGOURI}/traveo`);
		console.log("Database connected Successfully");
	}
	catch(e){
		console.log("There is some error in connecting the database "+e);
		process.exit(1);
	}

}


module.exports=mongoConnect;
