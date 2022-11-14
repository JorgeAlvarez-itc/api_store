const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    id: Number,
    name: { type: String, required: true, max: 200 }
}, { collection: 'category' })

const Category = mongoose.model('Category', categorySchema)

module.exports = Category