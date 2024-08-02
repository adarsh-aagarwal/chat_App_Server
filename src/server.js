


const connect = require("./config/db");
const app = require("./index");
const User = require("./Models/user.model");

const server = app.listen(5000, async () => {
    await connect();
    console.log("listening on port:" + 5000);
});

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log('connected to socket.io');

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined room ' + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (messageData) => {
        const { chatId, content, senderId } = messageData;
        console.log(`Message received in chat ${chatId} from ${senderId}: ${content}`);
        
        // Emit the message to all clients in the chat room
        io.to(chatId).emit("receiveMessage", messageData);
    });
});
