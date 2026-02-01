const http = require('http');
const net = require('net');

// Create a simple server
const server = http.createServer((req, res) => {
  console.log('Request received for:', req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

// Listen on port 3000
server.listen(3000, '0.0.0.0', function() {
  console.log('Server is listening on port 3000');
  console.log('Server address:', server.address());
  
  // Test if we can connect to localhost
  setTimeout(() => {
    const socket = net.createConnection({ port: 3000, host: 'localhost' }, () => {
      console.log('✓ Successfully connected to localhost:3000');
      socket.destroy();
      
      // Try the network IP
      const socket2 = net.createConnection({ port: 3000, host: '192.168.1.6' }, () => {
        console.log('✓ Successfully connected to 192.168.1.6:3000');
        socket2.destroy();
        
        // Now try all IPs
        const socket3 = net.createConnection({ port: 3000, host: '0.0.0.0' }, () => {
          console.log('✓ Successfully connected to 0.0.0.0:3000');
          socket3.destroy();
          setTimeout(() => process.exit(0), 500);
        });
        
        socket3.on('error', (err) => {
          console.log('✗ Failed to connect to 0.0.0.0:3000:', err.message);
          setTimeout(() => process.exit(0), 500);
        });
      });
      
      socket2.on('error', (err) => {
        console.log('✗ Failed to connect to 192.168.1.6:3000:', err.message);
        setTimeout(() => process.exit(0), 500);
      });
    });
    
    socket.on('error', (err) => {
      console.log('✗ Failed to connect to localhost:3000:', err.message);
      setTimeout(() => process.exit(0), 500);
    });
  }, 1000);
});

server.on('error', (err) => {
  console.log('Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.log('Port 3000 is already in use');
  }
  process.exit(1);
});

// Log if server crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
