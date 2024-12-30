const commentModel = require('../models/commentModel');
const blogModel = require('../models/blogModel');
const addComment = async (req, res) => {
    try {
        const blogid = req.query.id;
        const Blog = await blogModel.findOne({ _id: blogid });
        console.log(Blog);
        
        if (!Blog) {
            return res.status(404).send({
                success: false,
                messsge: "blog not Found",
            });
        }
        const { comment } = req.body
        const commentData = await commentModel.create({
            userid: req.user._id,
            blogid: blogid,
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
        const yourComment = await commentModel.find({ userid: req.user._id }).populate('userid').populate('blogid');
        return res.status(200).send({
            success: true,
            message: "Your comment is Fatched Successfully",
            yourComment
        })
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: 'errrrrr'
        });
    }
}

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
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
    deleteComment,
}