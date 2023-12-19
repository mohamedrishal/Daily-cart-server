// entry point of our server 

require('dotenv').config()
const express = require('express')
const cors = require('cors')

require('./DB/connection')
const routes = require('./Routes/router')

const dc_Server = express()
dc_Server.use(cors())
dc_Server.use(express.json())
dc_Server.use(routes)

const PORT = 3000 || process.env.PORT

dc_Server.listen(PORT,()=>{
    console.log(`Daily Cart Server started as a Port ${PORT} and Waiting for Client Requests!!!`);
})

dc_Server.get('/',(req,res)=>{
    res.send(`<h1>Daily Cart Server started as a Port ${PORT} and Waiting for Client Requests!!!</h1>`)
})