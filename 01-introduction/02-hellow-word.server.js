#!usr/bin/node

const http = require('http');

http.createServer((req,res) =>{
  res.end('hello woeld');
}).listen(8000);
