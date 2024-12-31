const blogModel = require('../models/blogModel');
const fs = require('fs');

const addBlog = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description || !req.file) {
            return res.status(400).send({
                success: false,
                message: "all Fields Are Required !!!...",
            });
        }

        const addBlog = await blogModel.create({
            userid: req.user._id,
            title: title,
            description: description,
            image: req.file.path
        });
        return res.status(200).send({
            success: true,
            message: "Blog Added Successfully",
            addBlog
        });

    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Error while adding blog",
        });
    }
}

const viewBlog = async (req, res) => {
    try {
        const yourBlog = await blogModel.find({ userid: req.user._id }).populate('userid');
        console.log(req.user._id);

        return res.status(200).send({
            success: true,
            message: "Your Blog is Fatched Successfully",
            yourBlog
        })
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err
        });
    }
}

const deleteBlog = async (req, res) => {
    try {
        const id = req.query.id;
        let Blog = await blogModel.findById(id);
        fs.unlinkSync(Blog.image);
        let delBlog = await blogModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: 'Blog removed Successfully',
            delBlog
        });
    }
    catch (err) {
        return res.status(400).send({
            success: false,
            message: err
        });
    }
}

const updateBlog = async (req, res) => {
    try {
        const id = req.query.id;
        const { title, description } = req.body;

        if (!title || !description || !req.file) {
            return res.status(400).send({
                success: false,
                message: "all Fields Are Required !!!...",
            });
        }
        let Blog = await blogModel.findById(id);
        fs.unlinkSync(Blog.image);
        const upBlog = await blogModel.findByIdAndUpdate(id, {
            title: title,
            description: description,
            image: req.file.path
        });

        return res.status(200).send({
            success: true,
            message: 'Blog updated Successfully',
            upBlog
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err
        });
    }
}


module.exports = {
    addBlog,
    viewBlog,
    deleteBlog,
    updateBlog
}