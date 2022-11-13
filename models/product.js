const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    id: { type: Number, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0, min: 0, max: 5 },
    stock: { type: Number, required: true, min: 0, max: 1000 },
    brand: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        require: false
    },
    thumbail: { type: String, required: true },
    images: { type: [String], required: false }
}, { collection: 'products' } )

const Product = mongoose.model('products', productSchema)

module.exports = Product