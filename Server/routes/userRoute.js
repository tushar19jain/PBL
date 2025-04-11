const express= require("express");
const userController=require('../controller/userController.js')
const router= express.Router();


router.post('/',userController.CreateUser);
router.post('/login',userController.Login);
// router.post('/update',UpdateUser);
// router.post('/delete',DeleteUser);


module.exports=router;
