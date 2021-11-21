const mongoose=require('mongoose');

// const shortId=require('shortid')

const signupSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{collection:'users'})

module.exports=mongoose.model('urlShortner',signupSchema)