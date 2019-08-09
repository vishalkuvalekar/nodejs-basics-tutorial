const http = require('http');
const fs = require('fs');

function reqListner(req, res) {
    // console.log(req);
    // it will stop server
    // process.exit();

    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write(`
            <html>
                <head><title>Test</title></head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message"/>
                        <button type="submit">send</button>
                    </form>
                </body>
            </html>
        `);
        return res.end();
    }
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, err => {
                // res.writeHeader(302, {location: '/'});
                // another way is
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
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