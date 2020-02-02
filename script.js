
const socket = io('http://localhost:2525');
const messageForm= document.getElementById('send-container');
let messageInput = document.getElementById('message-input')
let messageContainer = document.getElementById('message-container')

const name = prompt('Qual é o seu nome?');
appendMessage("Você entrou no Chat");
socket.emit('new-user', name)


socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`);
})
socket.on('user-connected', name =>{
    appendMessage(name + " entrou no chat");
})

socket.on('user-disconnected', name =>{
    appendMessage(name + " saiu no chat");
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value 
    //console.log(message);
    appendMessage(`Você: ${message}`)
    socket.emit('send-chat-message', message);

    messageInput.value="";
})


function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message
    messageContainer.append(messageElement)
}


