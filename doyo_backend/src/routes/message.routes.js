
const express=require('express');
const{createMessage}=require('../controller/message.controller');
const {Users}=require('../validation/users.validation');
const{authentication}=require('../middleware/authenticationToken.middleware')
const router=express.Router();
router.post('/postmessage/:userid',authentication,createMessage.sendmessage)
router.get('/getmessage/:userid',authentication,createMessage.getmessage);

  module.exports = router;
