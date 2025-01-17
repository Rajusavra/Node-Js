
const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    conpassword:{
        type:String,
        require:true
    }
})
const user=mongoose.model('user',userSchema);
module.exports=user;