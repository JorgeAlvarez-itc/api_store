const express = require('express');
const { ObjectId } = require('mongodb');
const Category = require('../models/category');

const router2 = express.Router();

router2.get('/category', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.send(categories);
    }
    catch (error) {
        console.log(error);
    }
});

router2.get('/category/:id', async (req, res) => {
    try {
        const categories = await Category.find({ "id": parseInt(req.params.id) });
        res.send(categories);
    }
    catch (error) {
        console.log(error);
    }
});

router2.post('/category/', async (req, res) => {
    try {
        const new_category = req.body
        const category = new Category(new_category)
        const categoryCreated = await category.save()
        res.send(categoryCreated)
    }
    catch (error) {
        console.log(error);
    }
});

router2.put('/category/:id', async (req, res) => {
    try {
        const cate_data = req.body;
        const updated_cat = await Category.findOneAndUpdate({ "id": parseInt(req.params.id) }, cate_data);
        res.send(updated_cat);
    } catch (error) {
        console.log(error);
    }
});

router2.delete('/category/:id', async (req, res) => {
    try {
        const deleted_cate = await Category.findOneAndDelete({ "id": parseInt(req.params.id) });
        res.send(deleted_cate);
  } catch (error) {
        console.log(error);
    }
});

module.exports = router2;