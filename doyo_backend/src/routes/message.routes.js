const express=require('express');
const{createMessage}=require('../controller/message.controller');
const {Users}=require('../validation/users.validation');
const{authentication}=require('../middleware/authenticationToken.middleware')
const router=express.Router();
router.post('/postmessage',authentication,createMessage.sendmessage)
// router.post('/getmessage',Users.login,Usercontroller.userSignin);

  module.exports = router;