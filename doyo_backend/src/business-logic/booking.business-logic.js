const Booking=require("../model/bookingmodel");
const bcryptjs=require('bcryptjs');
const {Conflict,Unauthorized}=require("http-errors");
const {aggregationData}=require('../helper/pagination.helper')
module.exports.createBooking=async({userid,startDate,endDate})=>{
    try {
        const booking=await Booking.create({
            userId:userid,startDate,endDate
        });
        return booking;
    } catch (error) {
        throw error
    }
}
module.exports.getBooking=async({perPage,pageNo})=>{
    try {
        let args=[];
        args.push({
            $sort:{
                createAt:-1
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"userId"
            }
        },
        {
            $unwind: {
              path: "$userId",
              preserveNullAndEmptyArrays: true,
            },
          },
    )
        const bookings = await aggregationData({
            model: Booking,
            per_page: Number(perPage),
            pageNo: Number(pageNo),
            args: args,
            isTotalData: true,
          });
          return bookings;
    } catch (error) {
        
    }
}