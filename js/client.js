 const socket= io('http://localhost:5500/')


const form = document.getElementById('send-container');
const messageInput= document.getElementById('Msg-input');
const messageContainer = document.querySelector(".container");
//playing audio to get msg notification
var audio = new Audio ('ding.wav');

//this append function will append the container
const append=(message,position) =>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position== 'left'){
    audio.play();
    }
}

//if msg has been submitted , send message to the server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append (`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value=''
})

//setting a prompt to the user to join the chat
const name =prompt("Enter your name to join chat");
socket.emit('new-user-joined',name);

//show the name if a new user joins
socket.on('user-joined', name => {
   append(`${name} joined the chat`, 'right')
})

//if user sends a msg recv it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
 })
//notify to the all of users if someone left the chat
 socket.on('left', name => {
    append(`${name} left the chat!`, 'right')
 })



