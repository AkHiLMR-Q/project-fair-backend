//1 Loads .env file contents into process.env by default.
require('dotenv').config()

//2 import express
const express=require('express')

//3 import cors
const cors = require('cors')

//7 import DB
const DB=require('./DB/connection')

//8 import router
const router=require('./Routes/router')
// const applicationMiddleware = require('./Middlewares/applicationMiddleware')

//4 create a application using express
const pfServer=express()

//5 uses
pfServer.use(cors())
pfServer.use(express.json())//Returns middleware that only parses
//10
// pfServer.use(applicationMiddleware)
//9
pfServer.use(router)

//used to export image from backend

pfServer.use('/uploads',express.static('./uploads'))

//6 port creation
const PORT =4000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log('pfServer listening on port'+PORT);
})


pfServer.get('/',(req,res)=>{
    res.send('welcome to project-fair')
})