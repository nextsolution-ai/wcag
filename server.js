const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Handle root path
    let filePath = req.url === '/' ? './test.html' : '.' + req.url;

    // Get the file extension
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    // Set content type based on file extension
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    }

    // Read the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code === 'ENOENT') {
                console.error(`File not found: ${filePath}`);
                res.writeHead(404);
                res.end('File not found');
            } else {
                console.error(`Server error: ${error.code}`);
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Error handling for the server
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error('Port 3000 is already in use');
    } else {
        console.error('Server error:', error);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 