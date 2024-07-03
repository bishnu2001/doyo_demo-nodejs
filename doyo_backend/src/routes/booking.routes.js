const express=require('express');
const{Createbooking}=require('../controller/booking.controller');
const {Users}=require('../validation/users.validation');
const{authentication}=require('../middleware/authenticationToken.middleware')
const router=express.Router();
router.post('/createbooking',authentication,Createbooking.createbooking);
router.get('/getbooking',authentication,Createbooking.getbooking);


module.exports=router;