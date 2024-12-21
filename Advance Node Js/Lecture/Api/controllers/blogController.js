const blogModel = require('../models/blogModel');

const addBlog = async (req,res) => {
    try {
        const {title,description} = req.body;

        if(!title || !description || !req.file){
            return res.status(400).send({
                success : false,
                message : "all Fields Are Required !!!...",
            });
        }
        
        const addPost = await blogModel.create({
            userid : req.user._id,
            title : title,
            description:description,
            image : req.file.path
        });
        return res.status(200).send({
            success : true,
            message : "Post Added Successfully",
            addPost
        });

    } catch (err) {
        return res.status(400).send({
            success : false,
            message: "Error while adding blog",
        });
    }
}

const viewBlog = async (req,res) => {
    try {
        const yourPost = await blogModel.find({userid:req.user._id}).populate('userid')
        return res.status(200).send({
            success : true,
            message : "Your post is Fatched Successfully",
            yourPost
        })
    } catch (err) {
        return res.status(400).send({
            success : false,
            message: 'errrrrr'
        });
    }
}


module.exports = {
    addBlog,
    viewBlog,
}