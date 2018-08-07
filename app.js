const http = require('http')
const fs = require('fs')
const path = require('path')

let rootDir = path.join(__dirname + '/www') 
let server = http.createServer((request,response) => {
  let targatPath = path.join(rootDir + request.url)
  console.log(targatPath)
  if(fs.existsSync(targatPath)){
    fs.stat(targatPath,(err,stats) => {
      if(err){
        console.log(err)
      }else{
        if(!stats.isDirectory()){
          // 表示是文件
          if(path.extname(targatPath) === '.html'){
            response.setHeader('content-type','text/html;charset=utf-8;')
          }
          if(path.extname(targatPath) === '.css'){
            response.setHeader('content-type','text/css;charset=utf-8;')
          }
          if(path.extname(targatPath) === '.png'){
            response.setHeader('content-type','image/png;charset=utf-8;')
          }
          fs.readFile(targatPath,function(err,data){
            if(err){
              console.log(err)
            }else{
              response.end(data)
            }
          })
        }else{
          // 表示是路径
          response.end('这是一个路径')
        }
      }
    })
    
    
  }else{
    response.setHeader('content-type','text/html;charset=utf-8;')
    response.statusCode = 404;
    response.end(`
      <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
      <html><head>
      <title>404 Not Found</title>
      </head><body>
      <h1>Not Found</h1>
      <p>The requested URL ${request.url} was not found on this server.</p>
      </body></html>
    `)
  }
})

server.listen('3000', '127.0.0.1', () => {
  console.log('服务启动成功')
})