// const ws = require("nodejs-websocket")
// let message = {
//     user1: [],
//     user2: []
// }
// let server = ws.createServer(function(conn){
//     console.log("server ws")

//     conn.on("text",(str)=>{
//         console.log("receive:",str)
//         let mes = str.split('&')
//         console.log(mes)
//         if(mes[0] === 'user1'){
//             message.user1.push(mes[1])
//             conn.sendText(' '+message.user2)
//             message.user2 = []
//         }
//         else{
//             message.user2.push(mes[1])
//             conn.sendText(' '+message.user1)
//             message.user1=[]
//         }
//         console.log(message)
//         console.log(ws)
    
        
//     })

//     conn.on("close",(code,reason)=>{
//         console.log("close")
//     })
// }).listen(8000)
// console.log(111)

const WebSocket = require('ws')

let user= []
const server = new WebSocket.Server({port:8000})
server.on('open',()=>{
    console.log('server open')
})
server.on('close',()=>{
    console.log('server close')
})
server.on('connection',(ws,req)=>{
    const ip = req.connection.remoteAddress;
    const port = req.connection.remotePort;
    const clientName = ip+port;
    user.push(clientName)
    // console.log(req,ws)
    console.log(clientName+'connnection')

    ws.send("start&"+clientName)
    ws.on('message',(mes)=>{
        console.log('receive:'+mes+clientName)
        server.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(clientName+'&'+mes)
                client.send(user)
            }
        })
    })
})