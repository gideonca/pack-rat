const net = require('net');

console.log('Starting Pack Rat server...');
// TODO: Setup a command parser and clean up function calls

const server = net.createServer((socket) => {
    console.log('Client connected');
    
    socket.on('data', (data) => {
        console.log(`Received data: ${data}`);
        switch (data.toString().toLowerCase().trim()) {
            case 'ping':
                console.log('Pinging back to client');
                socket.write('Pong');
                break;
            case 'echo':
                console.log('Echoing back the message');
                socket.write(data); // Echo back the received data
                break;
            default:
                console.log('Unknown command');
                socket.write('Unknown command');
        }
        // Here you would handle the incoming data and respond accordingly
        // if (data.toString.toLowerCase().trim() === 'ping') {
        //     console.log('Pong');
        //     socket.write('Pong');
        // } else {
        //     console.log('Unknown command');
        //     socket.write('Unknown command');
        // }
        // socket.write('Data received');
    });
});

console.log('Server is listening on port 6379');
server.listen(6379, () => {
    console.log('Server is ready to accept connections');
});