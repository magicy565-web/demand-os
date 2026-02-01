const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

// Create HTTP server
const server = http.createServer((req, res) => {
  try {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);
    
    // Normalize path
    if (pathname.endsWith('/') && pathname !== '/') {
      pathname = pathname.slice(0, -1);
    }

    console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    // Only handle GET requests
    if (req.method !== 'GET') {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
      return;
    }

    // Serve /_next/ static files
    if (pathname.startsWith('/_next/')) {
      const staticPath = path.join(__dirname, 'web', '.next', pathname.replace('/_next/', ''));
      return serveFile(res, staticPath);
    }

    // Serve public files
    const publicPath = path.join(__dirname, 'web', 'public', pathname);
    try {
      const stat = fs.statSync(publicPath);
      if (stat.isFile()) {
        return serveFile(res, publicPath);
      }
      if (stat.isDirectory()) {
        const indexPath = path.join(publicPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          return serveFile(res, indexPath);
        }
      }
    } catch (e) {
      // Path doesn't exist, continue to next handler
    }

    // Serve HTML from .next/server/app/
    let htmlPath;
    
    // For root path
    if (pathname === '') {
      htmlPath = path.join(__dirname, 'web', '.next', 'server', 'app', 'index.html');
      if (fs.existsSync(htmlPath)) {
        return serveFile(res, htmlPath);
      }
    }

    // Try pathname/index.html
    htmlPath = path.join(__dirname, 'web', '.next', 'server', 'app', pathname, 'index.html');
    if (fs.existsSync(htmlPath)) {
      return serveFile(res, htmlPath);
    }

    // Try pathname.html
    htmlPath = path.join(__dirname, 'web', '.next', 'server', 'app', pathname + '.html');
    if (fs.existsSync(htmlPath)) {
      return serveFile(res, htmlPath);
    }

    // Fallback to root index.html for client-side routing
    const fallbackPath = path.join(__dirname, 'web', '.next', 'server', 'app', 'index.html');
    if (fs.existsSync(fallbackPath)) {
      return serveFile(res, fallbackPath);
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Not Found</h1><p>No build artifacts found at ' + pathname + '</p>');

  } catch (error) {
    console.error('Error handling request:', error);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>500 - Server Error</h1><pre>' + error.message + '</pre>');
  }
});

function serveFile(res, filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    // Determine content type
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.svg': 'image/svg+xml',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.ico': 'image/x-icon',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.eot': 'application/vnd.ms-fontobject'
    };

    const contentType = contentTypes[ext] || 'application/octet-stream';

    // Set cache headers
    let cacheControl = 'public, max-age=0';
    if (ext === '.js' || ext === '.css' || ext === '.woff' || ext === '.woff2') {
      // Cache static assets
      if (filePath.includes('.next/static/')) {
        cacheControl = 'public, max-age=31536000, immutable';
      }
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'Content-Length': stat.size
    });

    // Stream file for better performance
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.writeHead(500);
      res.end('Stream error');
    });

  } catch (error) {
    console.error('Error serving file:', filePath, error.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error: ' + error.message);
  }
}

// Start server
const PORT = 3000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`✓ Server listening on http://0.0.0.0:${PORT}`);
  console.log(`✓ Accessible at http://localhost:${PORT}`);
  console.log(`✓ Accessible at http://192.168.1.6:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`✗ Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
