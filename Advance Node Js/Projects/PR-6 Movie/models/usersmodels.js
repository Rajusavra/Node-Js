const mongoose=require('mongoose')

const Userschema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
   
})

 const user= mongoose.model('user',Userschema)

 module.exports=user