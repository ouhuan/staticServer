const http = require('http')
const fs = require('fs')
const path = require('path')

let server = http.createServer((request,   response) => {
  response.end('hello')
})

server.listen('3000', '127.0.0.1', () => {
  console.log('服务启动成功')
})