const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    category:{
        type:String,
        require:true
    },
    status:{
        type:String,
       default:'deactive'
    }
})
const category=mongoose.model('category',categorySchema)
module.exports=category