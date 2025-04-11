const User= require("../models/usermodel.model.js");
const asynchandler=require("../utils/asynchandler.js");
const apiResponse=require("../utils/apiResponse.js");
const apiError=require("../utils/apiError.js");
const PasswordQuery= require('../utils/hashPassword.js');
const generateToken=require('../utils/generateJWTToken.js');



 
const CreateUser=asynchandler(async(req,res,next)=>{
   const {username,firstname,lastname,email,password}=req.body;
   let newPassword= await PasswordQuery.hashed(password);
   const u=await User.findOne({username});
   if(u){
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
      const newUser=await User.findOne(user._id).select('-password');
      return res.json(new apiResponse(100,"User Created Successfully",newUser));
   }
   else{
      throw new apiError(400,"User not Created, Invalid inputs");
   }
})



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
            const token= await generateToken(user);
            const options={
               httpOnly:true,
               secure:true,
               maxAge:24*60*60*1000,
               sameSite:'lax'
            }
            const newUser=await User.findOne(user._id).select('-password');
            return res.cookie('jwt',token,options).json(new apiResponse(100,"User logged In",newUser));
         }else{
            throw new apiError(404,"Invalid Password");
         }
       }
       else{
         throw new apiError(404,"User not found");
       }
});


const Delete=asynchandler(async(req,res,next)=>{
   const user= req.user;
      if(!user){
      throw new apiError(404,"User not Found");
   }
   else{
      await User.findByIdAndDelete(user.id);
      const options={
         httpOnly:true,
         secure:true,
      }
      return res.clearCookie('jwt',options).json(new apiResponse(100,"User Deleted SuccessFully"));
   }
})

const Update=asynchandler(async(req,res,next)=>{
   const {id}= req.params;
   const updates= req.body;

   if(updates.password){
      return res.json(new apiResponse(400,"Password is not Updated here"));
   }
   const Updateduser=await User.findByIdAndUpdate(
      id,
      {$set:updates},
      {new:true,runValidators:true}
   ).select('-password');
   if(!Updateduser){
      return res.json(new apiResponse(404,"User Not found"));
   }
   else{
      res.json(new apiResponse(100,"User Updated",Updateduser));
   }
})

const UpdatePassword=asynchandler(async(req,res,next)=>{
   const {id}= req.params;
   const {password}= req.body;
   const user=await User.findById(id);
   if(!user){
      return res.json(new apiResponse(404,"User Not Found"));
   }
   else{
      const newPassword=await PasswordQuery.hashed(password);
      const updateduser=await User.findByIdAndUpdate(
         id,
         {$set:{password:newPassword}},
         {new:true,runValidators:true}
      )
      
      if(!updateduser){
         return res.json(new apiResponse(404,"User Not Found"));
      }
      else{
         res.json(new apiResponse(100,"Password Updated",updateduser));
      }
   }
})

module.exports={CreateUser,Login,Delete,Update,UpdatePassword};