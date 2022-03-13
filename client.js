const socket = io('http://localhost:8000');

const form = document.getElementById('send-container') 
const messageInput= document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
//var audio= new Audio('ting.mp3');

const append = (message, position)=>{	
	const messageElement = document.createElement('div');
	messageElement.innerText=message;
	messageElement.classlist.add('message');
	messageElement.classlist.add(position);
	messageContainer.append(messageElement);
	if(position=='left'){
 	audio.play();
	}
}

const myname=prompt("Enter your name to join: ");
socket.emit('new-user-joined',myname);

socket.on('user joined',myname=>{
	append(`${myname} joined the chat`, 'right')
})

socket.on('receive',data=>{
	append(`${data.myname}:${data.user}`, 'left')
})

socket.on('left',myname=>{
	append(`${myname} left the chat`, 'right')
})

form.addEventListener('submit', (e)=>{
	e.preventDefault();
	const message= messageInput.value;
	append(`You: ${message}`,'right');
	socket.emit('send',message);
	messageInput.value=' '
})