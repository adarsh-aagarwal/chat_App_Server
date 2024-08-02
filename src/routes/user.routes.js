const { Router } = require("express");
const authenticate = require("../middleware/authenthicate");
const { findCurrentUser, searchUser, editUser, deleteUser } = require("../Controllers/user.controller");
const { findById } = require("../Models/user.model");

const router=Router();

router.get("/profile",authenticate,findCurrentUser)
router.get("/:userId",authenticate,findById)


//baseuser/user?search=keyword
router.get("/",searchUser)

router.put("/:id",authenticate,editUser)

router.delete("/:id",authenticate,deleteUser)

module.exports=router;







