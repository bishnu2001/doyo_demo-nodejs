const express=require('express');
const{Usercontroller}=require('../controller/users.controller');
const {Users}=require('../validation/users.validation')
const router=express.Router();
router.post('/signup',Users.create,Usercontroller.userSignup)
router.post('/signin',Users.login,Usercontroller.userSignin);

  module.exports = router;