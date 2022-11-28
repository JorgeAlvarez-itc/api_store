const express = require('express');
const { ObjectId } = require('mongodb');
const Product = require('../models/product');
const cors = require('cors');

const router = express.Router();

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/products/data/:id', async (req, res) => {
    try {
        const products = await Product.findById({"_id":ObjectId(req.params)});
        res.send(products);
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const products = await Product.find({ "id": parseInt(req.params.id) });
        res.send(products);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/products/', async (req, res) => {
    try {
        const new_product = req.body
        const product = new Product(new_product)
        const productCreated = await product.save()
        res.send(productCreated)
    }
    catch (error) {
        console.log(error);
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const prod_data = req.body;
        const updated_prod = await Product.findOneAndUpdate({ "id": parseInt(req.params.id) }, prod_data);
        res.send(updated_prod);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const deleted_prod = await Product.findOneAndDelete({ "id": parseInt(req.params.id) });
        res.send(deleted_prod);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router.use(cors());