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

        //     name: {
        //       type: String,
        //       required: true,
        //       trim: true,
        //     },
        //     // slug: {
        //     //   type: String,
        //     //   required: true,
        //     //   unique: true,
        //     // },
        //     type: {
        //       type: String,
        //     },
        //     // categoryImage: { type: String },
        //     parentId: {
        //       type: String,
        //     },
        //     // createdBy: {
        //     //   type: mongoose.Schema.Types.ObjectId,
        //     //   ref: "user",
        //     //   required: true,
        //     // },
        //   },
        //   { timestamps: true }
    });

    module.exports = mongoose.model('Category', CategorySchema);
