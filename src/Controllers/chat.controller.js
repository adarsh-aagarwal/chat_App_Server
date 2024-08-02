const Chat = require("../Models/chat.model");
const User = require("../Models/user.model");

const createChat = async (req, res) => {
  try {
    const { userId } = req.body;

    const reqUser = await req.user;

    if (!userId) {
      res.status(400).send({ error: "user id required for creating chat" });
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: reqUser.user._id } } },
        { users: { $elemMatch: { $eq: reqUser.userId } } },
      ],
    })
      .populate("users", "-passwword")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name  profile_image email",
    });
    if (isChat.length > 0) {
      return res.status(200).send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [reqUser.user._id, userId],
      };
    }

    const createdChat = await Chat.create(chatData);

    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );

    return res.status(200).send(fullChat);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};



const getAllChat = async (req, res) => {
  try {
    const reqUser = await req.user;
    const chats = await Chat.find(
      { users: reqUser.user._id })
      .populate("users", "-passwors")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ timestamp: -1 });

    return res.status(200).send(chats);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const createGroup = async (req, res) => {
  // Destructure userId and chatName from req.body
  const { userId, chatName } = req.body;

  // Get the request user
  const reqUser = await req.user;

  // Check if userId or chatName is not provided
  if (!userId || !chatName) {
    return res
      .status(400)
      .send({ error: "User ID and chat name are required fields" });
  }

  // Check if userId is an array and has at least one user
  if (!Array.isArray(userId) || userId.length < 1) {
    return res
      .status(400)
      .send({ error: "At least one user ID is required to create a group" });
  }

  // Initialize users array with userId and add the requesting user
  const users = [...userId, reqUser.user._id];

  try {
    // Create the group chat
    const createdGroup = await Chat.create({
      chatName,
      users,
      groupAdmin: reqUser.user._id,
      isGroupChat: true,
    });

    // Populate the chat with user details
    const fullChat = await Chat.findById(createdGroup._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    // Send the created chat details as response
    return res.status(200).send(fullChat);
  } catch (error) {
    // Handle any errors
    return res.status(400).send(error.message);
  }
};

const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res
      .status(200)
      .send({ message: "updated groupName", chat: updatedChat });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const addUserToGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const isChat = await Chat.findById(chatId);

    if (!isChat) {
      return res
        .status(400)
        .send({ error: "chat not found with ID " + chatId });
    }
    const isUser = await User.findById(userId);

    if (!isUser) {
      return res
        .status(400)
        .send({ error: "user not found with ID " + userId });
    }

    const updatedGroup = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).send({
      message: isUser.userName + " added to group",
      chat: updatedGroup,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const removeUserFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const isChat = await Chat.findById(chatId);

    if (!isChat) {
      return res
        .status(400)
        .send({ error: "chat not found with ID " + chatId });
    }
    const isUser = await User.findById(userId);

    if (!isUser) {
      return res
        .status(400)
        .send({ error: "user not found with ID " + userId });
    }

    const updatedGroup = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).send({
      message: isUser.userName + " removed from group",
      chat: updatedGroup,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  createChat,
  getAllChat,
  renameGroup,
  addUserToGroup,
  removeUserFromGroup,
  createGroup,
};
