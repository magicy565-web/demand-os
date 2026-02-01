const express = require('express');
const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const httpServer = createServer(server);
  
  httpServer.listen(3000, '0.0.0.0', (err) => {
    if (err) throw err;
    console.log('✓ Next.js server ready');
    console.log('  Local:        http://localhost:3000');
    console.log('  Network:      http://0.0.0.0:3000');
  });
});
