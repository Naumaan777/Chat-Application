const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".users-chat")

var audio = new audio('tune.mp3');


const append = (message, position) =>{
	const messageElement = documment.createElement('div');
	messageElement.innerText = message;
	messageElement.classList.add(message);
	messageElement.classList.add(position);
	messageContainer.append(messageElement);
	if(position =='left'){
		audio.play();
	}
}

form.addEventListner('submit', (e) =>{
	e.preventDefault();
	const message= messageInput.value;
	append(`You: ${message}`, 'right');
	socket.emit('send', message);
	messageInput.value =''
})

const name = prompt("Enter Your Name to Join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
	append(`${name} joinned the chat`, 'right') 
})

socket.on('receive', data =>{
	append(`${data.name}: ${data.message}`, 'left') 
})

socket.on('left', name =>{
	append(`{$name}left the chat`, 'right') 
})