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

const wss = new WebSocketServer({port: 8001})

wss.on("connection", (ws, request) => {
    ws.on("close", () => {
        wss.clients.forEach((client) => {
            client.send(`유저 한명이 떠났습니다. 현재 유저 ${wss.clients.size} 명`);
        })
    })

    ws.on("message", data => {
        wss.clients.forEach(client => {
            client.send(data.toString())
        })
    })

    // 클라이언트 브로드캐스트: 새로운 클라이언트가 접속하면 모든 클라이언트에게 알림
    wss.clients.forEach(client => {
        client.send(`새로운 유저 접속, 현재 유저 ${wss.clients.size} 명`)
    })
})
