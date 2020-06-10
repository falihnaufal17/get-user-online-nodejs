let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let path = require('path')
//username QSGRiciCpm 
//password Cix3uY1gxc
//host remotemysql.com
server.listen(8001);
let count = 0;
let $ipsConnected = [];

app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'index.html'));
})

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