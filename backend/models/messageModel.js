const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    content: {type: String},
    from: {type: Object},
    socketId: {type: String},
    time: {type: String},
    date: {type: String},
    to: {type: String}
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;