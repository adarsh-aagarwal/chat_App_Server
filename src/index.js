const express=require("express");
const cors = require('cors');
const app=express()

app.use(cors());
app.use(express.json())

app.get("/", (req,res)=>{
    return res.send({message:"welcome to whatsapp api "})
})

//auth
const authRoutes=require("./routes/auth.routh.js")
app.use("/auth",authRoutes);

//user
const userRoutes=require("./routes/user.routes.js")
app.use("/users",userRoutes)

//chat
const chatRoutes=require("./routes/chat.routes.js")
app.use("/chats",chatRoutes)

//message
const messageRoutes=require("./routes/message.routes.js")
app.use("/message",messageRoutes);

module.exports=app;