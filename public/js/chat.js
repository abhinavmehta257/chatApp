let socket = io(); //connect to the server

function scrollToBottom(){
    let message = document.querySelector('#messages').lastElementChild;
    message.scrollIntoView();
}
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
 
socket.on("newMessage",function(newMessage){
    
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template, {
        from: newMessage.from,
        text: newMessage.text,
        createdAt : moment(newMessage.createdAt).format('LT')
    });

    const div = document.createElement('div');
    div.innerHTML = html;

    document.querySelector('#messages').appendChild(div);
    scrollToBottom();
    // const formattedTime = moment(newMessage.createdAt).format('LT');
    // let li = document.createElement("li");
    // li.innerText = `${newMessage.from} ${formattedTime}: ${newMessage.text}`;

    // document.querySelector("body").appendChild(li);

});// handles new messages

// socket.on("newlocationMessage", function(newlocationMessage){
//     console.log("newMessage", newlocationMessage);
//     let li = document.createElement("li");
//     let a = document.createElement("a");
//     a.setAttribute('target', '_blank');
//     a.setAttribute('herf', newlocationMessage.url);
//     a.innerText = "My new location";
//     li.appendChild(a);

//     document.querySelector("body").appendChild(li);
// })

// socket.on("firstrMessage",function(newMessage){
//     console.log("newMessage", newMessage);
// });

// socket.on("broadcast", function(broadcastMessage){
//     console.log("Broadcast message is", broadcastMessage);
// })


document.querySelector('#submit-btn').addEventListener('click', function(event){
    event.preventDefault();
    socket.emit("createdMessage",{
        from:"User",
        text:document.querySelector('input[name = "message"]').value
    },function(){
    
    })
}) // send new message

document.querySelector('#send-location').addEventListener('click', function(event){
    if(!navigator.geolocation){
        return alert("geo location not supported by your browser");
    }else{
        navigator.geolocation.getCurrentPosition(function(position){
            console.log(position);
            socket.emit("createPosition",{
                lat: position.coords.latitude,
                lon: position.coords.longitude
            })
        }, function(err){
            alert("unable to fetch location :", err);
        })
    }
}) //send location
    