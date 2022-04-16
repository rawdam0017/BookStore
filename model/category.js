const mongoose = require("mongoose");
const book = require('../model/Book')
const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        }
        , description: {
            type: String,
            required: true,
            trim: true
        }
        , books: [book.schema]

    });

module.exports = mongoose.model('Category', CategorySchema);
