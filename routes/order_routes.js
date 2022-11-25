const express = require('express');
const { ObjectId } = require('mongodb');
const Order = require('../models/order');
const Product = require('../models/product');

const router2 = express.Router();

router2.get('/order/get', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.send(orders);
    }
    catch (error) {
        console.log(error);
    }
});

router2.get('/order/details/:id', async (req, res) => {
    try {
        const orders = await Order.find({ "id": parseInt(req.params.id) });
        res.send(orders);
    }
    catch (error) {
        console.log(error);
    }
});

router2.post('/order/add/', async (req, res) => {
    try {
        const new_order = req.body
        const order = new Order(new_order)
        const orderCreated = await order.save()
        res.send(orderCreated)
    }
    catch (error) {
        console.log(error);
    }
});

router2.put('/order/update/:id', async (req, res) => {
    try {
        const order_data = req.body;
        const updated_order = await Order.findOneAndUpdate({ "id": parseInt(req.params.id) }, order_data);
        res.send(updated_order);
    } catch (error) {
        console.log(error);
    }
});

router2.delete('/order/delete/:id', async (req, res) => {
    try {
        const deleted_order = await Order.findOneAndDelete({ "id": parseInt(req.params.id) });
        res.send(deleted_order);
  } catch (error) {
        console.log(error);
    }
});

router2.get('/order/getlast', async (req, res) => {
    const id = await Order.find({}).sort({'id':-1}).limit(1).select('id');

    if (!id) {
        res.status(500).json({ success: false })
    }
    res.send(id);
});

/*
router2.get('/order/details/:id', async (req, res)=> {
    try {
        //const cat = req.params.id+"";
        var cat = req.params.prod;
        var s1 = cat.substring(0,1);
        var s2 = cat.substring(1);
        const aux = s1.toUpperCase();
        const url_cat = aux.concat(s2);
        const bd_cat = await Order.findOne({"name":url_cat});
        
        const products = await Product.find({"order":bd_cat._id}).populate('category')
        res.send(products)
    } catch (error) {
        console.log(error)
    }
})
*/
module.exports = router2;