const path = require("path");
const http = require("http");
const express = require("express");
const {generateMessage, generateLocationMessage} = require("./utils/message.js");
const {isRealString} =  require("./utils/isRealString.js");
const socketIO = require("socket.io");
const { utils } = require("mocha");
const {Users} = require("./utils/users.js");

const publicPath = path.join(__dirname + "/../public")
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);

let io = socketIO(server); 
let users = new Users();

app.use(express.static(publicPath));
 
io.on('connection', (socket)=>{
    console.log("a new user just connected");//listen for a new user

    
    console.log(socket.id);

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
       let user = users.getUser(socket.id);

       if(user && isRealString(message.text)){
        io.to(user.room).emit("newMessage",generateMessage(user.name, message.text)); //send message to all but me
       }
   })

    

    socket.on('join', (param, callback)=>{
        if(!isRealString(param.name) || !isRealString(param.room)){
            return callback("name or room missing");
        }
        // console.log(param.room);
        socket.join(param.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, param.name, param.room);

        io.to(param.room).emit('updateUserList', users.getUserList(param.room));

        socket.emit("newMessage",generateMessage('admin',`Welcome to ${param.room}`));
        socket.broadcast.to(param.room).emit("newMessage",generateMessage('admin',`${param.name} has entered the chatroom`));// broadcast to everyone except me
        callback();
    })
    
    socket.on("disconnect", ()=>{
        console.log("user was disconnected from server");
        
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit("newMessage",generateMessage('admin',`${user.name} has left chatroom`));
        }
    });// after dis  connection

    socket.on("createPosition",(coords)=>{
        io.emit("newlocationMessage", generateLocationMessage('User',coords.lat, coords.lon));
    })
});


server.listen(port, ()=>{
    console.log(`server is up and running on port : ${port}`);
})