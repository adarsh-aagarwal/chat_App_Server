


const { Router } = require("express");
const authenticate = require("../middleware/authenthicate");
const {
  createChat,
  getAllChat,
  renameGroup,
  addUserToGroup,
  removeUserFromGroup,
  createGroup,
} = require("../Controllers/chat.controller");

const router = Router();

router.post("/", authenticate, createChat);
router.get("/", authenticate, getAllChat);
router.put("/rename", authenticate, renameGroup);
router.put("/add/user", authenticate, addUserToGroup);
router.put("/remove/user", authenticate, removeUserFromGroup); // Correctly defined route
router.post("/group", authenticate, createGroup);

module.exports = router;
