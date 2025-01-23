const createmodel = require('../models/createmodel');
const registerModel = require('../models/registermodel');
const fs = require('fs');

const createUser = async (req, res) => {
    try {
        let imagename = '';
        if (req.file) {
            imagename = req.file.path;
        }

        let userdata = await createmodel.create({
            description: req.body.description,
            image: imagename,
            userId: res.locals.users.id
        })
        return res.redirect('/dashbord');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const dashbord = async (req, res) => {
    try {
        let alldata = await createmodel.find({}).populate('userId');
        // console.log(alldata);
        return res.render('dashbord', {
            record: alldata
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const logout = (req, res) => {
    req.logout((error) => {
        if (error) {
            console.log(error);
            return false;
        }
        return res.redirect('/');
    })
}

const delteRecord = async (req, res) => {
    try {
        let removefile = await createmodel.findById(req.query.delid);
        fs.unlinkSync(removefile.image);

        let deleteRecord = await createmodel.findByIdAndDelete(req.query.delid);
        return res.redirect('/dashbord');

    } catch (error) {
        console.log(error);
        return false;
    }
}


const editRecord = async (req, res) => {
    try {
        let editimage = await createmodel.findById(req.query.editId);
        return res.render('edit', {
            single: editimage
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const updateUser = async (req, res) => {
    try {
        if (req.file) {
            let imageupdate = await createmodel.findById(req.body.editid);
            fs.unlinkSync(imageupdate.image);

            let updateRecord = await createmodel.findByIdAndUpdate(req.body.editid, {
                description: req.body.description,
                image: req.file.path,
            })
            return res.redirect('/dashbord');
        }
        else {
            let record = await createmodel.findById(req.body.editid);
            let updaterecord = await createmodel.findByIdAndUpdate(req.body.editid, {
                description: req.body.description,
                image: record.image,
            })
            return res.redirect('/dashbord');
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const profile = async (req, res) => {
    try {
        let allprofile = await createmodel.find({ userId: res.locals.users.id }).populate('userId');
        let userdetails = await registerModel.find({});
        return res.render('profile', {
            allprofile, userdetails
        });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const postLike = async (req, res) => {
    try {
        let userid = res.locals.users._id;
        let posts = await createmodel.findByIdAndUpdate(req.params.id, {
            $push: { likes: userid }
        });
        console.log("Post successfully liked");
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const postUnLike = async (req, res) => {
    try {
        let userid = res.locals.users._id;
        let posts = await createmodel.findByIdAndUpdate(req.params.id, {
            $pull: { likes: userid }
        });
        console.log("Post successfully unliked");
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = ({
    createUser, dashbord, logout, delteRecord, editRecord, updateUser, profile, postLike, postUnLike
})