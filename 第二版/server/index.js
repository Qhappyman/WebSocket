const http = require('http');
const url = require('url');
const fs = require('fs');
var WebSocket = require('ws');
var fun = function (request, response) {
    var stream = fs.createReadStream('../views/ws.html', {
        flag: 'r',
        encoding: 'utf8'
    });
    stream.pipe(response);
}
var server = http.createServer(fun).listen(8000);
var wss = new WebSocket.Server({
    server: server
});

wss.broadcast = function broadcast() {
    wss.clients.forEach(function each(client) {
        if (client.readyState == WebSocket.OPEN) {
            client.send("开始通信吧！");
        }
    })
}
wss.on('connection', function connection(ws, req) {
    var s;
    //const location = url.parse(req.url, true);
    ws.on('message', function incoming(message) {
        console.log(message);
        var smg = JSON.parse(message);
        console.log(smg.msg + " " + smg.name);
        if (smg.msg != "") {
            s = smg.name + "说：" + smg.msg;
            ws.send(s);
        } else {
            ws.send("说些什么吧，别这么高冷呀")
        }
    });
    wss.broadcast();
})