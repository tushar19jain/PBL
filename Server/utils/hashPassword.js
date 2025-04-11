const bcrypt= require("bcrypt");

// let pass='';
const hashed=async (password)=>{
     const hash= await bcrypt.hash(password,10);
     return hash;
}

const isValidPassword=async(password,newPassword)=>{
     const res=await bcrypt.compare(password,newPassword)
     return res;
}
module.exports={hashed,isValidPassword};