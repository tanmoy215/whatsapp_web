const mongoose = require('mongoose');
const chat = require('./models/chat');

main().then(res=>{
    console.log("Connection successfull")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//chat
    let allchats = [
        {
            from:"Sayan",
            to:"Amit",
            msg:"Hellow buddy Good Morning",
            Create_at: new Date()
        },
        {
            from:"Sampad",
            to:"Tanmoy",
            msg:"Hello Tanmoy How are You",
            Create_at: new Date()
        },
        {
            from:"Hrishikesh",
            to:"Bipasha",
            msg:"Where are you i am waiting here last 3 years",
            Create_at:new Date()
        },
        {
            from:"Tanmoy",
            to:"Moyna Majee",
            msg:"Good Morning Mom",
            Create_at:new Date()
        },
        {
            from: "Aniket",
            to:"Tanmoy",
            msg:"Well Done Bro",
            Create_at:new Date()
        }
    ];
    chat.insertMany(allchats);