const { Router } = require("express");
const authenticate = require("../middleware/authenthicate");
const { getAllMessage, createMessage } = require("../Controllers/message.controller");

const router=Router();
// "/messages/chatId"
router.get("/:chatId",authenticate,getAllMessage)
//"/messages"
router.post("/",authenticate,createMessage)

module.exports=router