const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv");

const app = express(); 

//Connect with DB
dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() => {

    console.log("Connected to DB!");

}).catch((error) => {

    console.log(error.message);
    
});

const rooms=["miljan","ricpe"];
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//create server
const server = require("http").createServer(app);
const PORT = 5000;
const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

server.listen(PORT, () => {
    console.log(`Serve at: http://localhost:${PORT}`);
});