const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})

app.use(bodyParser.json());

app.post('/',(req,res)=>{
    res.send(req.body)
})