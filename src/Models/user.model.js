



const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    mobile: {
        type: Number,
        required: false,
    },
}, { timestamps: true });

userSchema.pre("save", function(next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hashSync(this.password, 8);
    this.userName = this.userName.toLowerCase();
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
