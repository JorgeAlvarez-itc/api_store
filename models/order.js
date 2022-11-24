const mongoose = require('mongoose')
const Product = require('./product')

const orderSchema = mongoose.Schema({
    id: Number,
    date: { type: Date, required: true },
    user_id: { type: Number, required: false },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'product',
        required: true
    },
    status: { type: String, required: true },
    dest_address: { type: String, required: true } // dirección concatenada en un string

}, { collection: 'order' })

const Order = mongoose.model('order', orderSchema)

module.exports = Order