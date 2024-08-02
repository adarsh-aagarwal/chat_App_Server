const Chat = require("../Models/chat.model");
const Message = require("../Models/message.model");

const getAllMessage = async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const isChat = await Chat.findById(chatId);
    // console.log(isChat);
    if (!isChat) {

      return res
        .status(400)
        .send({ error: "chat dosent exsist with id", chatId });
    }

    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "-password")
      .populate("chat");

    return res.status(200).send(messages);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};




const createMessage = async (req, res) => {
  const { senderId,content, chatId } = req.body;

  try {
    const reqUser = req.user; // Assume req.user is already populated by middleware
    
    // Check for required fields
    if (!content || !chatId) {
      return res.status(400).send({ error: "Content and chat ID are required" });
    }

    // Create the new message
    const newMessage = new Message({
      sender: senderId,
      content,
      chat: chatId,
    });

    // Save the message to the database
    const createdMessage = await newMessage.save();

    // Populate sender and chat fields, then return the full message
    const fullMessage = await Message.findById(createdMessage._id)
      .populate("sender", "name email") // Populate sender with specific fields like name and email
      .populate("chat"); // Optionally populate chat details if needed

    return res.status(201).send(fullMessage); // Respond with the created message
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};




module.exports={createMessage,getAllMessage}