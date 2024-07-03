const {createBooking,getBooking} =require("../business-logic/booking.business-logic");
const { Conflict ,NotFound} = require("http-errors");

const createbooking=async(req,res,next)=>{
    try {
        const userid=req.userId;
        if(!userid) throw new NotFound("user not found")
        const {startDate,endDate}=req.body;
        const booking=await createBooking({userid,startDate,endDate});
        res.json({
            success:true,
            message:"booking successfull",
            data:booking
        })
    } catch (error) {
        next(error)
    }
}
const getbooking=async(req,res,next)=>{
    try {
        const {
            search,
            perPage,
            pageNo,
          } = req?.query;
        const bookings=await getBooking({search,
            perPage,
            pageNo});
        res.json({
            success:true,
            message:"all booking fetch successfull",
            data:bookings
        })
    } catch (error) {
       next(error) 
    }
}
module.exports.Createbooking={
    createbooking,
    getbooking
}