const express= require("express");
const dotenv= require("dotenv");
const cors= require("cors");
const mongoConn= require('./config/db.js');
const app= express();
dotenv.config();
app.use(cors());
//setup cors

const connectApp= async()=>{
	try{
		await mongoConn();
		app.listen(process.env.PORT,()=>{
			console.log(`Server is listening at Port ${process.env.PORT}`);
		})
	}catch(e){
		console.log("There is some error in the server"+e);
	}
}
connectApp();
module.exports=app;

