const express=require('express');
const{Usercontroller}=require('../controller/users.controller');
const {Users}=require('../validation/users.validation');
const{authentication}=require('../middleware/authenticationToken.middleware')
const router=express.Router();
router.post('/signup',Users.create,Usercontroller.userSignup)
router.post('/signin',Users.login,Usercontroller.userSignin);
router.get('/protected', authentication, (req, res) => {
  // Access granted, req.user now contains the decoded user object from the token
  res.json({ message: 'You have access to this protected route', user: req.userId }); 
});

  module.exports = router;