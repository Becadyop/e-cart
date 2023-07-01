var mongoose=require('mongoose')

const con=()=>{

 return mongoose.connect("mongodb+srv://arun:becadyop530@cluster0.pxmueqd.mongodb.net/EBUY?retryWrites=true&w=majority")
}

module.exports=con;