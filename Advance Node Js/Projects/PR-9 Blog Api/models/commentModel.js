const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    blogid:{
         type : mongoose.Schema.Types.ObjectId,
         ref : "blog"
    },
    comment:{
        type : String,
        required : true
    }
})

const comment = mongoose.model('comment',commentSchema);
module.exports = comment;