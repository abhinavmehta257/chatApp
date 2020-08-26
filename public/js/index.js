let socket = io(); //connect to the server

socket.on("connect", function(){
    console.log("connectes to server");

    // socket.emit('createMessage',{
    //     from:"gulla",
    //     text:"hi how are u"
    // })
})// on making the connection

socket.on("disconnect", function(){
    console.log("disconnected from server");
})// after dis  connection
 
// socket.on("newMessage",function(newMessage){
//     console.log("newMessage", newMessage);
// });

socket.on("firstrMessage",function(newMessage){
    console.log("newMessage", newMessage);
});

socket.on("broadcast", function(broadcastMessage){
    console.log("Broadcast message is", broadcastMessage);
})