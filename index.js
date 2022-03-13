//node server which will handle socket io connections
const io=require('socket.io')(8000)

const users={};

io.on('connections', socket =>{
	socket.on('new-user-joined', myname =>{
		//console.log("New user",myname);
		users[socket.id] = myname;
		socket.broadcast.emit('user-joined', myname);
	});
	
	socket.on('send',message=>{
		socket.broadcast.emit('receive', {message: message, myname: user[socket.id]})
	});

	socket.on('disconnect',message=>{
		socket.broadcast.emit('left', users[socket.id]);
		delete users[socket.id];
	});
});