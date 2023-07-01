var con=require('../config/config')
var checkuser=require('../Middlewares/Checkuser')
var razorpay=require('../payment/Razorpay')
const usermodel=require('../Models/userModel')
const productModel = require('../Models/productModel')
const cartmodel=require('../Models/cartmodel')
const home=async (req,res)=>{
    let product=await productModel.find()
    if(req.session.user){
        let user=req.session.user;
        let cart = await cartmodel.findOne({userID:user._id})
         if(cart){
            console.log(cart,"from cart")
            let count = cart.products.length;
            console.log(count,'....')
            res.render('index',{user,product,count})
    }else{
        res.render('index',{user,product})
    }
}
else{
    res.render('index',{product})
}
}
   
const login=(req,res)=>{
    res.render('users/login')
}
const register=(req,res)=>{
    res.render('users/register')
}
const doregister=async(req,res)=>{
    console.log(req.body);
    try {
        await usermodel.create(req.body);
        console.log('user inserted')
        res.redirect('/login')
    } catch (error) {
        console.log(error)
        
    }

}
const dologin=async(req,res)=>{
     console.log(req.body);
     try {
        let user= await usermodel.find({name:req.body.username,password:req.body.password})
        console.log(user)
        if(user.length>0){
            console.log('login success')
            req.session.user=user[0]
            console.log(req.session.user,'session')
            res.redirect('/')
        }else{
            console.log('login error')
            res.redirect('/login')
        }
     
     } catch (error) {
        
     }
  

  
}

const myorder=(req,res)=>{
    res.render('users/myorder')
}
const logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/')

}
const addtocart=async (req,res)=>{
    try {
        let{pid}=req.params;
        let{user}=req.session;
        let product= await productModel.findOne({_id:pid});
        product.id= pid;
        console.log(product,'product details')
        let obj={
            item:product,
            quantity:1
        };
        let cart= await cartmodel.findOne({userID:user._id})
        if(cart){
            let itemfound=false;
            for(let i=0;i<cart.products.length;i++){
                if(cart.products[i].item._id == pid){
                    console.log('item found')
                    await cartmodel.findOneAndUpdate({'products.item.id':product._id},
                    {
                        $inc:{'products.$.quantity':2}
                    }
                    )
                    itemfound=true;
                    break;
                }
    
            }
            if(!itemfound) {
                console.log('item not found')
                cart.products.push((obj))
            }
            await cart.save()
            res.redirect('/')
        }
        else{
            let cartobj={
                userID:user._id,
                products:[obj]
            };
            console.log('cart',cartobj)
            await cartmodel.create(cartobj)
            res.redirect('/')
        }
        
    } catch (error) {
        console.log(error)
        
    }
   
}


const cartPage = async (req, res) => {
    let { user } = req.session;
    try {
        let cart = await cartmodel.findOne({ userID: user._id });
        console.log(cart);
        let products = cart.products;
        console.log("products", products);
        let totalItems = products.length;
        let totalPrice = 0;

        products.forEach((obj) => {
            totalPrice += obj.item.price * obj.quantity;
        });

        console.log(totalPrice, 'total price');

        let data = {
            totalItems,
            totalPrice
        };

        res.render('users/cart', { products, data });
    } catch (error) {
        console.log(error);
    }
};





const buynow=async(req,res)=>{
     let productid=req.params.id;
     let user=req.session.user;
     try {
        let product=await productModel.find({_id:productid})
        console.log(product)
        product=product[0]
        res.render('users/buy',{product,user})
     } catch (error) {
        console.log(error)
        
     }
   
}
const checkout=(req,res)=>{
    let productid=req.params.id;
    let price=req.params.price;
    console.log(productid,price)
    
var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  razorpay.orders.create(options, function(err, order) {
    if(err){
        console.log(err)
    }else{
        console.log(order);
        res.render('users/checkout',{order})

    }
  });

}
const payVerify = async(req,res) =>
{
    console.log(req.body);
    let data = req.body;
    var crypto = require('crypto');
    var order_id = data['response[razorpay_order_id]']
    var payment_id = data[ 'response[razorpay_payment_id]']
    const razorpay_signature = data[ 'response[razorpay_signature]']
    const key_secret = "nhuwa5cqmVHrDX1P4Ro1I8xy";
    let hmac = crypto.createHmac('sha256', key_secret); 
    await hmac.update(order_id + "|" + payment_id);
    const generated_signature = hmac.digest('hex');
    if(razorpay_signature===generated_signature){
        console.log('verified')
        res.redirect('/')
    }
    else{
        console.log('failed')
    } 

}
const cancelpage=(req,res)=>{
    // req.session.destroy()
    res.redirect('/')
}
module.exports={home,login,register,doregister,dologin,myorder,cancelpage,logout,addtocart,buynow,checkout,payVerify,cartPage}