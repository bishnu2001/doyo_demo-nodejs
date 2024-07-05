
const { sendMessage,getMessage} = require("../business-logic/message.business-logic");
const { Conflict, NotFound, Unauthorized } = require("http-errors");

const sendmessage = async (req, res, next) => {
  try {
    const senderId=req.userId;
    const { userid } = req.params;
    const{content,bookingId}=req.body;
    const receiverId=userid
    const postmessage = await sendMessage({ senderId, receiverId, content ,bookingId});
    res.json({
      success: true,
      message: "message create successfull",
      data: postmessage,
    });
  } catch (error) {
    next(error);
  }
};
const getmessage=async(req,res,next)=>{
    try {
        const{userid}=req.params;
        const message=await getMessage({userid});
        res.json({
            success:true,
            message:"all messages",
            data:message
        })
    } catch (error) {
        next(error)
    }
}
module.exports.createMessage = {
  sendmessage,
  getmessage
};
