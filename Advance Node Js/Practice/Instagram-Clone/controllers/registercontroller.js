const registerModel = require('../models/registermodel');

const register = (req, res) => {
    return res.render('register');
}

const login = (req, res) => {
    if (res.locals.users) {
        return res.redirect('/dashbord');
    }
    return res.render('login');
}

const addUser = async (req, res) => {
    try {
        let User = await registerModel.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        return false;
    }
}

// const dashbord = async (req, res) => {
//     try {
//         let alldata = await createmodel.find({});
//         return res.render('dashbord', {
//             record: alldata
//         })
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

const loginUser = (req, res) => {
    return res.redirect('/dashbord');
}

const create = (req, res) => {
    return res.render('create');
}

module.exports = ({
    register, login, addUser, loginUser, create
})