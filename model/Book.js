const mongoose = require('mongoose');
require('mongoose-type-url');



const OBJECT_ID = mongoose.Schema.Types.ObjectId;

const Schema = mongoose.Schema;

const bookschema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,

    },
    image: {
        type: mongoose.SchemaTypes.Url,
    },
    categoryId: {
        type: OBJECT_ID,
        ref: 'Category'
    },



});

module.exports = mongoose.model("Book", bookschema);
