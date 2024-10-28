const mongoose = require('mongoose'); 
const chatSchema = new mongoose.Schema({
      from:{
        type:String,
        required:true
      },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxlenght:50
    },
    Create_at:{
        type:Date,
        required:true
    }
});
let chat = mongoose.model("chat",chatSchema);
module.exports = chat;