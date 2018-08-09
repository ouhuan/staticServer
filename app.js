const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

let rootDir = path.join(__dirname + '/www') 
let server = http.createServer((request,response) => {
  let targatPath = path.join(rootDir + request.url)
  console.log(targatPath)
  if(fs.existsSync(targatPath)){
    fs.stat(targatPath,(err,stats) => {
      if(err){
        console.log(err)
      }else{
        if(!stats.isDirectory(targatPath)){
          // 表示是文件
          response.setHeader('content-type',mime.getType(targatPath) + ';charset=utf-8;')
          fs.readFile(targatPath,function(err,data){
            if(err){
              console.log(err)
            }else{
              response.end(data)
            }
          })
        }

        if(stats.isDirectory(targatPath)){
          // 表示是路径
          fs.readdir(targatPath, (err,flies) => {
            let res = flies.find((item) => {
              return item === 'index.html'
            })
            if(res){
              fs.readFile(path.join(targatPath, 'index.html'),(err, data) => {
                response.end(data)
              })
            }
            if(!res){
              let tem = ''
              for(let i = 0; i < flies.length;i++){
                tem = `<li><a href="${request.url}${request.url == '/' ? '' : '/'}${flies[i]}"> ${flies[i]}</a></li>`
              }
              response.end(` 
              <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
              <html>
              <head>
              <meta charset="utf-8">
                <title>Index of /</title>
              </head>
              <body>
                <h1>Index of /</h1>
              <ul>
                ${tem}
              </ul>
              </body>
              </html>
              `)
            }

          })
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
      <meat clarset="utf-8"></meat>
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