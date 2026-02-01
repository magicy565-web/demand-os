const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

// 不处理任何关闭信号，让服务器一直运行
// process.on('SIGINT') 被故意删除，防止任何中断

// Create HTTP server
const server = http.createServer((req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);
    
    if (pathname.endsWith('/') && pathname !== '/') {
      pathname = pathname.slice(0, -1);
    }

    console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.method !== 'GET') {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
      return;
    }

    // /_next/ static files
    if (pathname.startsWith('/_next/')) {
      const staticPath = path.join(__dirname, 'web', '.next', pathname.replace('/_next/', ''));
      return serveFile(res, staticPath);
    }

    // public 文件
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
      // continue
    }

    // .next/server/app/ HTML 文件
    let htmlPath;
    
    if (pathname === '') {
      htmlPath = path.join(__dirname, 'web', '.next', 'server', 'app', 'index.html');
      if (fs.existsSync(htmlPath)) {
        return serveFile(res, htmlPath);
      }
    }

    htmlPath = path.join(__dirname, 'web', '.next', 'server', 'app', pathname, 'index.html');
    if (fs.existsSync(htmlPath)) {
      return serveFile(res, htmlPath);
    }

    htmlPath = path.join(__dirname, 'web', '.next', 'server', 'app', pathname + '.html');
    if (fs.existsSync(htmlPath)) {
      return serveFile(res, htmlPath);
    }

    // 404 fallback - 用index.html处理客户端路由
    const fallbackPath = path.join(__dirname, 'web', '.next', 'server', 'app', 'index.html');
    if (fs.existsSync(fallbackPath)) {
      return serveFile(res, fallbackPath);
    }

    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Not Found</h1>');

  } catch (error) {
    console.error('Error:', error.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error: ' + error.message);
  }
});

function serveFile(res, filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

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
      '.ttf': 'font/ttf'
    };

    const contentType = contentTypes[ext] || 'application/octet-stream';

    let cacheControl = 'public, max-age=0';
    if (filePath.includes('.next/static/')) {
      cacheControl = 'public, max-age=31536000, immutable';
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
      'Content-Length': stat.size
    });

    fs.createReadStream(filePath).pipe(res);

  } catch (error) {
    console.error('File error:', error.message);
    res.writeHead(500);
    res.end('Error');
  }
}

// 启动服务器
server.listen(3000, '0.0.0.0', () => {
  console.log('✓ Server ready at http://localhost:3000');
  console.log('✓ Network: http://192.168.1.6:3000');
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
});

// 防止任何外部信号关闭服务器
process.on('SIGINT', () => { /* 忽略 */ });
process.on('SIGTERM', () => { /* 忽略 */ });
process.on('SIGHUP', () => { /* 忽略 */ });
