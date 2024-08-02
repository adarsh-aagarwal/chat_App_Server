const { default: mongoose } = require("mongoose");

const chatSchema = mongoose.Schema({
  chatName: {
    type: String,
    trim: true,
  },
  isGroupChat: {
    type: Boolean,
  },

  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
  timestamps: true
})

// const Chat=mongoose.model("chat",chatSchema);
const Chat=mongoose.model("chat",chatSchema);
module.exports=Chat;
