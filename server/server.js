const path = require("path");
const http = require("http");
const express = require("express");
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
    
   
    socket.emit("firstMessage",{
        from:"Admin",
        text:"Welcome to chat app"
    })

    socket.broadcast.emit("broadcast",{
        from:"Admin",
        text:"new user join",
        createdAt:new Date().getTime()
    });// broadcast to everyone except me

    socket.on("disconnect", ()=>{
        console.log("user was disconnected from server");
    });// after dis  connection
});


server.listen(port, ()=>{
    console.log('server is up and running on port : ${port}');
})