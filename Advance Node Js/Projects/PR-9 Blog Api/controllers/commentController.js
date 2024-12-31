const commentModel = require('../models/commentModel');
const blogModel = require('../models/blogModel');
const addComment = async (req, res) => {
    try {
        const blogid = req.query.id;
        const blog = await blogModel.findOne({ id: blogid });
        console.log(blog);
        
        if (!blog) {
            return res.status(404).send({
                success: false,
                messsge: "blog not Found",
            });
        }
        const { comment } = req.body
        const commentData = await commentModel.create({
            blogid: blog,
            comment: comment
        });
        return res.status(200).send({
            success: true,
            messsge: "Comment Added sucessfully",
            commentData
        });

    } catch (error) {
        return res.status(501).send({
            success: false,
            err: error
        })
    }
}

const viewComment = async (req, res) => {
    try {
        
        const yourComment = await commentModel.find({})
        .populate('userid', 'name email')
        .populate('blogid', 'title description');
        return res.status(200).send({
            success: true,
            message: "Your comment Fatched Successfully",
            yourComment
        })
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        });
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.query.id;
        let comment = await commentModel.findById(id);
        let delcomment = await commentModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: 'comment removed Successfully',
            delcomment
        });
    }
    catch (err) {
        return res.status(400).send({
            success: false,
            message: err
        });
    }
}


module.exports = {
    addComment,
    viewComment,
    deleteComment
}