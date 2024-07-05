
const Message = require("../model/messagemodel");
const bcryptjs = require("bcryptjs");
const { Conflict, Unauthorized } = require("http-errors");

module.exports.sendMessage = async ({
  senderId,
  receiverId,
  content,
  bookingId,
}) => {
  try {
    const postmessage = await Message.create({
      senderId,
      receiverId,
      content,
      bookingId,
    });
    return postmessage;
  } catch (error) {
    throw error;
  }
};

module.exports.getMessage = async ({ userid }) => {
  try {
    const messages = await Message.find({ receiverId: userid });
    return messages;
  } catch (error) {
    throw error;
  }
};
