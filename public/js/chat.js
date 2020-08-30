let socket = io(); //connect to the server

function scrollToBottom(){
    let message = document.querySelector('#messages').lastElementChild;
    message.scrollIntoView();
}
socket.on("connect", function(){
    console.log("connectes to server");

    let searchQuery = window.location.search.substring(1);
    let param = JSON.parse('{"' + decodeURI(searchQuery ).replace(/&/g, '","').replace(/\+/g, ' ').replace(/=/g, '":"') + '"}');

    socket.emit('join', param, function(err){
        if(err){
            alert("input field empty" + err);
            window.location.href = '/';
        }else{
            console.log("no err");
        }
    })
})// on making the connection

socket.on("disconnect", function(){
    console.log("disconnected from server");
})// after disconnection
 
socket.on('updateUserList', function(users){
    console.log(users);
    let ol = document.createElement('ol');

    users.forEach(user => {
        let li = document.createElement('li');
        li.innerHTML = user;
        ol.appendChild(li);
    });
    
    let userList = document.querySelector('#users');
    userList.innerHTML = '';
    userList.appendChild(ol);
})

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
    
});// handles new messages



document.querySelector('#submit-btn').addEventListener('click', function(event){
    event.preventDefault();
    socket.emit("createdMessage",{
        from:"User",
        text:document.querySelector('input[name = "message"]').value
    },function(){
    
    })
}) // send new message

// document.querySelector('#send-location').addEventListener('click', function(event){
//     if(!navigator.geolocation){
//         return alert("geo location not supported by your browser");
//     }else{
//         navigator.geolocation.getCurrentPosition(function(position){
//             console.log(position);
//             socket.emit("createPosition",{
//                 lat: position.coords.latitude,
//                 lon: position.coords.longitude
//             })
//         }, function(err){
//             alert("unable to fetch location :", err);
//         })
//     }
// }) //send location
    