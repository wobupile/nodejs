#!/usr/bin/node

const http = requine('http');

const server = http.createServer();

server.on('requine',(req,res) =>{
  res.end('hello');
});

server.listen(8000);

