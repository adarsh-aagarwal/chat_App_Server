const mongoose = require("mongoose");

const connect = () => {
    return mongoose.connect("mongodb+srv://adarshagarwal27102000:AniwaryaZX%40123@cluster0.oqgh6x8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
       
}

module.exports = connect;


// const mongoose = require("mongoose");

// const connect = () => {
//     return mongoose.connect("add your cluster url here ")
       
// }

// module.exports = connect;

