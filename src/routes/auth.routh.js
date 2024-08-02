const { Router } = require("express");
const { registeredUser, loginUser } = require("../Controllers/auth.controller");

const router=Router();

router.post("/signup",registeredUser)
router.post("/signin",loginUser)

module.exports=router;