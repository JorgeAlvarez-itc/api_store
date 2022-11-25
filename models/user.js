const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    username:{
        type: String,
        required: true,
    },
    image:{
        type:String,
        required:true        
    },
    role:{
        type:String,
        required:true
    },
    street: {
        type: String,
        default: '',
        required:false
    },
    zip :{
        type: String,
        default: '',
        required:false
    },
    city: {
        type: String,
        default: '',
        required:false
    },
    country: {
        type: String,
        default: '',
        required:false
    }
});
/*
user_schema.virtual('oid').get(function () {
    return this._id.toHexString();
});
*/
user_schema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', user_schema);
exports.user_schema = user_schema;