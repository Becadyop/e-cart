var mongoose=require('mongoose');

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name needed"]
    },
    email:{
        type:String,
        required:[true,"email needed"]
    },
    password:{
        type:String,
        required:[true,"password needed"]
    }
})
module.exports=mongoose.model('users',userschema)