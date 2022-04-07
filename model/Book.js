const mongoose = require('mongoose');
require('mongoose-type-url');


const Schema = mongoose.Schema;

const bookschema = new Schema({
    name: {
        type: String,
        required: true
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
        // type: String,
        type:mongoose.SchemaTypes.Url,
    }

});

module.exports = mongoose.model("Book", bookschema);
