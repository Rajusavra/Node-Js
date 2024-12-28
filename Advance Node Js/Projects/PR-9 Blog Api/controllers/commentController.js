const commentModel = require('../models/commentModel');
const fs = require('fs');

const addComment = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).send({
                success: false,
                message: "all Fields Are Required !!!...",
            });
        }

        const addPost = await commentModel.create({
            userid: req.user._id,
            title: title,
            description: description
        });
        return res.status(200).send({
            success: true,
            message: "Post Added Successfully",
            addPost
        });

    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Error while adding blog",
        });
    }
}

const viewComment = async (req, res) => {
    try {
        const yourPost = await commentModel.find({ userid: req.user._id }).populate('userid')
        return res.status(200).send({
            success: true,
            message: "Your post is Fatched Successfully",
            yourPost
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
        let post = await commentModel.findById(id);
        let delPost = await commentModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: 'Post removed Successfully',
            delPost
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