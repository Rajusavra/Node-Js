const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    }
})
const category=mongoose.model('category',categorySchema)
module.exports=category