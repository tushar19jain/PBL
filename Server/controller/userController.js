const User= require("../models/usermodel.model.js");
const asynchandler=require("../utils/asynchandler.js");
const apiResponse=require("../utils/apiResponse.js");
const apiError=require("../utils/apiError.js");
const PasswordQuery= require('../utils/hashPassword.js');


const CreateUser=asynchandler(async(req,res,next)=>{
   const {username,firstname,lastname,email,password}=req.body;
   let newPassword= await PasswordQuery.hashed(password);
   if(User.findOne(username)){
      throw new apiError(409,"Duplicate error");
   }
   const user= new User({
      username:username,
      firstname:firstname,
      lastname:lastname,
      email:email,
      password:newPassword
   })
   if(user){
      await user.save();
      return res.json(new apiResponse(100,"User Created Successfully",user));
   }
   else{
      throw new apiError(400,"User not Created, Invalid inputs");
   }
})



// integrate jwt authoriazation
const Login=asynchandler(async(req,res,next)=>{
       const {email,password}=req.body;
       if(!email || !password){
           throw new apiError(404,"Credentials are not present");
       }
       const user=await User.findOne({email:email});
       if(user){
         const oldPass= await user.password;
         const isValidPassword=await PasswordQuery.isValidPassword(password,oldPass);
         if(isValidPassword){
              return res.json(new apiResponse(100,"User logged In"));
         }else{
            throw new apiError(404,"Invalid Password");
         }
       }
       else{
         throw new apiError(404,"User not found");
       }
});



module.exports={CreateUser,Login};