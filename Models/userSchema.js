//schema map to a mongodb collection

//1 import mongoose
const mongoose=require('mongoose')

//2 schema creation
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
    github:{
        type:String,
     },

     livelink:{
        type:String,
     },
     profile:{
        type:String,
        required:true
     },
})

//3 create model

const users=mongoose.model('users',userSchema)
module.exports=users