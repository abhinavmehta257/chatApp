const path = require("path");
const http = require("http");
const express = require("express");
const {generateMessage, generateLocationMessage} = require("./utils/message.js");

const socketIO = require("socket.io");

const publicPath = path.join(__dirname + "/../public")
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);

let io = socketIO(server); 

app.use(express.static(publicPath));
 
io.on('connection', (socket)=>{
    console.log("a new user just connected");//listen for a new user

    socket.on("createMessage",(message)=>{
        console.log("created message", message);
        // io.emit("broadcast",{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // }) //broadcast message to everyone
    })// on reciving new message

    // socket.emit("newMessage",{
    //     from:"abhnav",
    //     text:"hi how are you"
    // });// sending message to clint
    
   socket.on("createdMessage", (message)=>{
       io.emit("newMessage",generateMessage(message.from, message.text)); //send message to all but me
   })

    socket.emit("newMessage",generateMessage('admin','Welcome to chat app'));

    socket.broadcast.emit("newMessage",generateMessage('admin','new user entered'));// broadcast to everyone except me

    socket.on("disconnect", ()=>{
        console.log("user was disconnected from server");
    });// after dis  connection

    socket.on("createPosition",(coords)=>{
        io.emit("newlocationMessage", generateLocationMessage('User',coords.lat, coords.lon));
    })
});


server.listen(port, ()=>{
    console.log(`server is up and running on port : ${port}`);
})