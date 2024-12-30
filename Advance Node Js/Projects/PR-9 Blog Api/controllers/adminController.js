const blogModel = require('../models/blogModel');
const commeentModel = require('../models/commentModel');

const blogDetails = async (req, res) => {
    try {
        let blogData = await blogModel.find({}).populate('userid');
        return res.status(200).send({
            success: true,
            message: "Blogdetails fetched successfully",
            blogData
        });
    } catch (err) {
        return res.status(501).send({
            success: false,
            err: err
        });
    }
}

const commentDetails = async (req, res) => {
    try {

        const comments = await commeentModel.find({}).populate('userid').populate('blogid')
        return res.status(200).send({
            success: true,
            message: 'commentdetails fatched successfully',
            comments

        });
    } catch (error) {
        return res.status(501).send({
            success: false,
            err: err
        });
    }
}

module.exports = {
    blogDetails,
    commentDetails
}