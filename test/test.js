const http = require("http");

const server = http.createServer((req,res)=>{
  console.log("request received");
});

server.listen(3000,()=>{
  console.log("server restarted");
})