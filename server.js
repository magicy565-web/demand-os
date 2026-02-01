const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');

// Create HTTP server
const server = createServer(async (req, res) => {
  try {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    const urlParsed = parse(req.url, true);
    const pathname = urlParsed.pathname;

    // Serve Next.js static files from /_next/
    if (pathname.startsWith('/_next/')) {
      const staticPath = path.join(__dirname, 'web', '.next', pathname.replace('/_next/', ''));
      if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
        const content = fs.readFileSync(staticPath);
        res.writeHead(200, { 'Content-Type': getContentType(staticPath) });
        res.end(content);
        return;
      }
    }

    // Serve public files
    const publicPath = path.join(__dirname, 'web', 'public', pathname);
    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
      const content = fs.readFileSync(publicPath);
      res.writeHead(200, { 'Content-Type': getContentType(publicPath) });
      res.end(content);
      return;
    }

    // Serve public directory files (images, etc)
    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isDirectory()) {
      const indexPath = path.join(publicPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
        return;
      }
    }

    // Serve HTML from .next/server/app/
    // For root path
    if (pathname === '/' || pathname === '') {
      const htmlPath = path.join(__dirname, 'web', '.next', 'server', 'app', 'index.html');
      if (fs.existsSync(htmlPath)) {
        const content = fs.readFileSync(htmlPath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
        return;
      }
    }

    // Try to find HTML file for the path in .next/server/app/
    let htmlFilePath = path.join(__dirname, 'web', '.next', 'server', 'app', pathname.substring(1), 'index.html');
    if (fs.existsSync(htmlFilePath)) {
      const content = fs.readFileSync(htmlFilePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
      return;
    }

    // Try pathname.html
    htmlFilePath = path.join(__dirname, 'web', '.next', 'server', 'app', pathname.substring(1) + '.html');
    if (fs.existsSync(htmlFilePath)) {
      const content = fs.readFileSync(htmlFilePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
      return;
    }

    // Fallback - serve index.html for client-side routing
    const fallbackPath = path.join(__dirname, 'web', '.next', 'server', 'app', 'index.html');
    if (fs.existsSync(fallbackPath)) {
      const content = fs.readFileSync(fallbackPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Not Found</h1><p>Next.js build artifacts not found. Run: npm run build</p>');
    }
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>500 - Internal Server Error</h1>');
  }
});

// Get content type based on file extension
function getContentType(filepath) {
  const ext = path.extname(filepath).toLowerCase();
  const types = {
    '.html': 'text/html',
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
  return types[ext] || 'application/octet-stream';
}

// Start server
const port = 3000;
const hostname = '0.0.0.0';

server.listen(port, hostname, () => {
  console.log(`✓ Server listening on http://localhost:${port}`);
  console.log(`✓ Also accessible at http://192.168.1.6:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`✗ Port ${port} is already in use`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
