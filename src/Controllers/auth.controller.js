


const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
require("dotenv").config();

const generateToken = (user) => {
    return jwt.sign({ user: user }, process.env.SECRET_KEY);
}

const registeredUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).send({ error: "User already exists with this email: " + req.body.email });
        }

        user = await User.create(req.body);
        const token = generateToken(user);

        res.status(201).send({ token, isAuth: true, message: "Register Success" });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(400).send({ error: "User not found with email: " + req.body.email });
        }

        const match = await user.comparePassword(req.body.password); // Ensure this is an async function

        if (!match) {
            return res.status(400).send({ error: "Incorrect username or password" });
        }

        const token = generateToken(user);

        res.status(201).send({ token, isAuth: true, message: "Login Success" });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = { registeredUser, loginUser };
