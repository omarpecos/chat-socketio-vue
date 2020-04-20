var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', (req, res) =>{
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) =>{
    console.log('Conectado!!!');
    io.emit('connections', Object.keys(io.sockets.connected).length);

    socket.on('disconnect', function(){
        console.log('user disconnected');
      });

    //recibe evento el socket
    socket.on('test', (data) =>{
       socket.broadcast.emit('test',(data));
    });

    //recibe evento el socket
    socket.on('chat-message', (data) =>{
        socket.broadcast.emit('chat-message',(data));
     });

     //recibe evento el socket
    socket.on('typing', (data) =>{
        socket.broadcast.emit('typing',(data));
     });
     //recibe evento el socket
    socket.on('stopTyping', (data) =>{
        socket.broadcast.emit('stopTyping',(data));
     });

     socket.on('joined', (data)=>{
      socket.broadcast.emit('joined',(data));
     });

     socket.on('leaved', (data)=>{
      socket.broadcast.emit('leaved',(data));
     });

  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});

