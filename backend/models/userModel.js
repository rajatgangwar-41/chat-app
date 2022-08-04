const mongoose = require("mongoose");
const { isEmail } = require("validator");

//Create table for user
const userSchema = new mongoose.Schema({
    name: {type: String, required: [true, "Can't be blank"]},
    email: {type: String, required: [true, "Can't be blank"], unique: true, lowercase: true, index: true,
     validate: [isEmail, "Invalid Email"]},
    password: {type: String, required: [true, "Can't be blank"]},
    image: {type: String},
    newMessages: {type: Object, default: {}},
    status: {type: String, default: "Online"}
}, {
    minimize: false,
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;