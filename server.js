var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var count = 0;
var $ipsConnected = [];

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=>{

    var $ipAddress = socket.handshake.address;

    if(!$ipsConnected.hasOwnProperty($ipAddress)){
        $ipsConnected[$ipAddress] = 1;
        count++;
        io.emit('counter', {count: count})
        console.log('count user: ' + count)
    }

    console.log('a user connected');

    socket.on('chat message', (data)=>{
        console.log('message: ' + data);
        io.emit('chat message', data);
    })

    socket.on('disconnect', ()=>{

        if($ipsConnected.hasOwnProperty($ipAddress)){
            delete $ipsConnected[$ipAddress];
            count--;
            io.emit('counter', {count: count})
            console.log('count user: ' + count)
        }
        
        console.log('user disconnected')
    })
})

http.listen(process.env.PORT || 3000, () =>{
    console.log('listening on *: ' + process.env.PORT || 3000);
})