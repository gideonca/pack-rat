const net = require('net');

console.log('Starting Pack Rat server...');

const server = net.createServer((socket) => {
    console.log('Client connected');
    
    // TODO: Setup a command parser and clean up function calls
    socket.on('data', (data) => {
        console.log(`Received data: ${data}`);
        switch (data.toString().toLowerCase().trim()) {
            case 'ping':
                console.log('Pinging back to client');
                socket.write('Pong');
                break;
            case 'echo': //TODO: Need to figure out how to break the command out of the string and recognize echo
                console.log('Echoing back the message');
                var command = data.toString();
                var message = command.substring(command.indexOf(' ') + 1); // Get the message after the command
                socket.write(message); // Echo back the received data
                break;
            default:
                console.log('Unknown command');
                socket.write('Unknown command');
        }
    });
});

console.log('Server is listening on port 6379');
server.listen(6379, () => {
    console.log('Server is ready to accept connections');
});