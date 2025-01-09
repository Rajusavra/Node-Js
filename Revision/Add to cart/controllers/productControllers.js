const productModel = require('../models/productModel');
const fs = require('fs');
const path = require('path');

const addProductPage = (req, res) => {
    res.render('addProduct');
}

const insertProduct = async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;
        if (!name || !description || !price || !quantity || !req.file) {
            console.log('All Fields Are Required');
            return res.redirect('/product');
        }

        const productData = await productModel.create({
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            image: req.file.path
        });
        return res.redirect('/product/viewproduct');
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewProduct = async (req, res) => {
    try {
        const product = await productModel.find({})
        return res.render('viewproduct', {
            product
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.query.id;

        let product = await productModel.findById(id);
        fs.unlinkSync(product.image);
        await productModel.findByIdAndDelete(id);

        return res.redirect('/product/viewproduct');

    } catch (err) {
        console.log(err);
        return false;
    }
}

const editProduct = async (req, res) => {
    try {
        const id = req.query.id;
        const product = await productModel.findById(id);
        return res.render('editProduct', {
            product
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, quantity } = req.body;
        const product = await productModel.findById(id);
        if (req.file) {
            fs.unlinkSync(product.image);
            changeData = await productModel.findByIdAndUpdate(id, {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                image: req.file.path
            });
        } else {
            const product = await productModel.findById(id);
            changeData = await productModel.findByIdAndUpdate(id, {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                image: product.image
            });
        }
        return res.redirect('/product/viewproduct');
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    addProductPage,
    insertProduct,
    viewProduct,
    deleteProduct,
    editProduct,
    updateProduct
}