const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const indexFilePath = path.join(PUBLIC_DIR, 'index.html');

    fs.exists(indexFilePath, function (exists) {
      if (exists) {
        fs.readFile(indexFilePath, function (error, data) {
          res.writeHead(200, {
            'Content-Type': 'text/html'
          });
          res.write(data);
          return res.end();
        });
      } else {
        const notFoundFilePath = path.join(PUBLIC_DIR, '404.html');

        fs.readFile(notFoundFilePath, function (error, data) {
          res.writeHead(404, {
            'Content-Type': 'text/html'
          });
          res.write(data);
          return res.end();
        });
      }
    });
  } else {
    const filePath = path.join(PUBLIC_DIR, req.url);

    fs.exists(filePath, function (exists) {
      if (exists) {
        fs.readFile(filePath, function (error, data) {
          let contentType;
          if (filePath.endsWith('.html')) {
            contentType = 'text/html';
          } else if (filePath.endsWith('.css')) {
            contentType = 'text/css';
          } else if (filePath.endsWith('.js')) {
            contentType = 'text/javascript';
          } else {
            contentType = 'text/plain';
          }

          res.writeHead(200, { 'Content-Type': contentType });
          res.write(data);
          return res.end();
        });
      } else {
        const notFoundFilePath = path.join(PUBLIC_DIR, '404.html');

        fs.readFile(notFoundFilePath, function (error, data) {
          res.writeHead(404, {
            'Content-Type': 'text/html'
          });
          res.write(data);
          return res.end();
        });
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
