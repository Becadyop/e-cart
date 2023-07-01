var mongoose=require('mongoose');

const product= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"email needed"]
    },
    price:{
        type:String,
        required:[true,"price needed"]
    },
    offer:{
        type:String,
        required:[true,"offer needed"]
    },
    
    descri:{
        type:String,
        required:[true,"description needed"]
    }
})
module.exports=mongoose.model('prodcts detail',product)