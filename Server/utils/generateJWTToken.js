const jwt= require('jsonwebtoken');


const generateToken=async(user)=>{
   const data={
      id:user._id,
      name:user.name,
      email:user.email,
   }
   const token= await jwt.sign(
         data,
         process.env.SECRET,
         {
            expiresIn: '5h',
         }
         
   )
   return token;
}


module.exports=generateToken;