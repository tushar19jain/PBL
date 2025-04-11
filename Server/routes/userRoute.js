const express= require("express");
const userController=require('../controller/userController.js');
const jwtVerify=require('../middlewares/jwtVerify.js')
const router= express.Router();


router.post('/',userController.CreateUser);
router.post('/login',userController.Login);
router.put('/update/:id',jwtVerify,userController.Update);
router.delete('/delete',jwtVerify,userController.Delete);
router.put('/changepass/:id',jwtVerify,userController.UpdatePassword);

module.exports=router;
