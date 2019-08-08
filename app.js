const  http = require('http');

function reqListner(req, res) {
    console.log(req);
}

const server = http.createServer(reqListner);

server.listen(3000);