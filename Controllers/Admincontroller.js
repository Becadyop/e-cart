var con=require('../config/config')
const productmodel=require('../Models/productModel')
const adminhome=(req,res)=>{
    res.render('admin/home')
}
const adminlogin=(req,res)=>{
    let username='admin'
    let password='admin'
    console.log(req.body)
    if(req.body.username ==username && password==password){
    console.log('login successfully')
    res.render('admin/adminhome')
    }else{
        console.log('login error')
        res.render('admin/home')
    }

}
const adminhomepage=(req,res)=>{
    res.render('admin/adminhome')
    
}
const addproduct=(req,res)=>{
    res.render('admin/addproduct')
}
const productpage=async(req,res)=>{
    let files=req.files.image;
    // console.log(files)
    const {name}=req.files.image;
    req.body.image=name;
    console.log(req.body)
    try {
        let products= await productmodel.create(req.body)
        console.log(products)
        files.mv('public/images/products/'+ products._id,(err)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect('/admin/addproduct')
            }
        })
        
        
    } catch (error) {
        console.log(error)
        
    }
   
 
}


module.exports={adminhome,adminlogin,adminhomepage,addproduct,productpage}