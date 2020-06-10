let app = requre('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
//username QSGRiciCpm 
//password Cix3uY1gxc
//host remotemysql.com
server.listen(9202);
let count = 0;
let $ipsConnected = [];

io.on('connection', (socket) =>{
    let $ipAddress = socket.handshake.address;
    if(!$ipsConnected.hasOwnProperty($ipAddress)){
        $ipsConnected[$ipAddress] = 1;
        count++;
        socket.emit('counter', {count: count})
    }

    console.log("Client is connected");

    /* Disconnected */
    socket.on('disconnect', () =>{
        if($ipsConnected.hasOwnProperty($ipAddress)){
            delete $ipsConnected[$ipAddress];
            count--;
            socket.emit('counter', {count: count})
        }
    })
})