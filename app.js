const http = require('http');

function reqListner(req, res) {
    console.log(req);
    // it will stop server
    // process.exit();

    res.setHeader('Content-Type', 'text/html');
    res.write(`
        <html>
            <head><title>Test</title></head>
            <body>Hello from node.js server</body>
        </html>
    `);
    res.end();
}

const server = http.createServer(reqListner);

server.listen(3000);