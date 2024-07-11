// node.js 서버 생성
const express = require("express")
const app = express()

app.use(express.static("public"))
// express.static() 정적 파일 제공하는 역할
// public 정적 파일이 위치한 디렉토리 경로

app.listen(8000, () => {
    console.log("Example app listening on port 8000")
})

// 서버 실행 > node app.js
