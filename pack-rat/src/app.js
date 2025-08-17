const net = require('net');

console.log('Starting Pack Rat server...');
const server = net.createServer((socket) => {
    console.log('Client connected');
    
    socket.on('data', (data) => {
        console.log(`Received data: ${data}`);
        // Here you would handle the incoming data and respond accordingly
        if (data.toString().trim() === 'Ping') {
            console.log('Pong');
            socket.write('Pong');
        } else {
            console.log('Unknown command');
            socket.write('Unknown command');
        }
        socket.write('Data received');
    });
});

console.log('Server is listening on port 6379');
server.listen(6379, () => {
    console.log('Server is ready to accept connections');
});