var mongoose=require('mongoose')

const cartschema=new mongoose.Schema({
    products: Array,
    userID: String
})

module.exports=mongoose.model('cart',cartschema)