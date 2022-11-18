const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    id: Number,
    name: { type: String, required: true, max: 200 },
    image: { type: String}

}, { collection: 'category' })

const Category = mongoose.model('category', categorySchema)

module.exports = Category