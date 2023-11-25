// Node server which will handle socket io connection


const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{                               // socket.io instance it's listen to all socket  linke an alen connect and arina connect and new user connect
	socket.on('new-user-joined', name =>{             // handle any particular connection whats comming and back, event access
		//console.log("New user", name)
		users[socket.id] = name;                   //its store the append to const users in 
		socket.broadcast.emit('user-joined', name);    // when continue in the chat and suddenly other will join so it's notify to all this person has joined, append the const users

 	
	});
	socket.on('send', message =>{
		socket.broadcast.emit('receive', {message: message, name: users[socket.id]})   // when someone has send the message so please receive to all with help of this event
	});

	socket.on('disconnect', message =>{
		socket.broadcast.emit('left', user[socket.id]);
		delete users[socket.id];
	});

})


