const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/");

let userSchema = mongoose.Schema({
    userName:String,
    email:String
});

module.exports = mongoose.model("user", userSchema);
