const express = require('express');
const app = express();
const port = 8080;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Chat model
const Chat = require("./models/chat.js"); // Change variable name to avoid confusion

// Path
const path = require('path');

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));


//Method- Override
let methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Mongoose connection
const mongoose = require('mongoose');
const chat = require('./models/chat.js');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
        console.log("Connection successful");
    } catch (err) {
        console.error("Connection error:", err);
    }
}

main();

// Index route
app.get("/chats", async (req, res) => {
    try {
        let chats = await Chat.find();
        res.render("index.ejs", { chats });
    } catch (err) {
        console.error("Error fetching chats:", err);
        res.status(500).send("Internal Server Error");
    }
});

// New chat route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Create Route
app.post("/chats", async (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        Create_at: new Date(),
    });
    try {
        await newChat.save();
        console.log("Data was saved");
        res.redirect("/chats");
    } catch (err) {
        console.error("Error saving chat:", err);
        res.status(500).send("Error saving chat");
    }
});

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    try {
        let chatData = await Chat.findById(id); // Change variable name to avoid confusion
        if (!chatData) {
            return res.status(404).send("Chat not found");
        }
        res.render("edit.ejs", { chat: chatData });
    } catch (err) {
        console.error("Error finding chat:", err);
        res.status(500).send("Internal Server Error");
    }
});

//Update Route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;

    // Ensure "chat" model is imported and accessible
    try {
        let updatedChat = await chat.findByIdAndUpdate(
            id,
            { msg: newMsg },
            { runValidators: true, new: true }
        );

        console.log(updatedChat);
        res.redirect("/chats");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating chat.");
    }
});

//delete Route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    await chat.findByIdAndDelete(id);
    res.redirect("/chats");
});


// Listening
app.listen(port, () => {
    console.log("Server is running on port 8080...");
});
