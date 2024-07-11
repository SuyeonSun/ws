// node.js 서버 생성
const express = require("express")
const {WebSocketServer} = require("ws")

const app = express()

app.use(express.static("public"))
// express.static() 정적 파일 제공하는 역할
// public 정적 파일이 위치한 디렉토리 경로

app.listen(8000, () => {
    console.log("Example app listening on port 8000")
})
// 서버 실행 > node app.js

// 웹소켓 서버 생성
const wss = new WebSocketServer({port: 8001})

// 웹소켓 서버 연결 이벤트 바인드
// wss: 웹소켓 서버, ws: 연결된 클라이언트
wss.on('connection', (ws, request) => {
    // 데이터 수신 이벤트 바인드
    ws.on("message", data => {
        console.log(`Received from user: ${data}`)
        ws.send(`Received from user: ${data}`)
    })

    ws.send(`Hello, ${request.socket.remoteAddress}`) // 연결 직후 클라이언트로 데이터 전송
    /*
    * 이렇듯, 웹소켓은 클라이언트의 요청 없이도 능동적으로 먼저 클라이언트에게 데이터를 전송할 수 있는 전이중통신 (Full-Duplex Communication) 을 지원한다.
    * 따라서 HTTP 와 다르게 요청과 응답을 따로 구분하지 않는다.
    */

})
