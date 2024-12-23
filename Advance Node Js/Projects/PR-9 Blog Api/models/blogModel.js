const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
});

const blog = mongoose.model('blog',blogSchema);

module.exports = blog ;