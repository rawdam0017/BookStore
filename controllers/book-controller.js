var mongoose = require('mongoose');

const Book = require("../model/Book")
const { Category } = require("../model/category")
const BookCatalog = mongoose.model('Category', Category);



const getAllBooks = async (req, res, next) => {
    let books;

    try {
        books = await Book.find();
    } catch (err) {
        console.log(err);
    }

    if (!books) {
        return res.status(404).json({ message: "No product found" })
    }
    return res.status(200).json({ books })
}

const getById = async (req, res, next) => {
    const id = req.params.id
    let book;

    try {
        book = await Book.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ message: "No book found" })
    }
    return res.status(200).json({ book })
}

const addBook = async (req, res, next) => {
    BookCatalog.findOne({ name: req.body.catName }, function (err, category) {

        if (err) {
            res.json(err);
        }
        else if (category == null) {
            res.json('Category not found!');
        }
        else {
            category.books.push({
                name: req.body.name,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
                available: req.body.available,
            });
            category.save(function (err, data) {
                if (err) {
                    res.json(err);
                }
                else {
                    // res.json(data);
                }
            });
            const { name, author, description, price, available, image } = req.body
            let book;

            try {

                book = new Book({
                    name,
                    author,
                    description,
                    price,
                    image,
                    available,
                })
                book.save();
            } catch (err) {
                console.log(err);
            }

            if (!book) {

                return res.status(500).json({ message: 'Unable to add' })
            }

            return res.status(200).json({ book })

        }
    });

}

const UpdateBook = async (req, res, next) => {
    const id = req.params.id;
    const { name, author, description, price, available, image } = req.body
    let book;

    try {

        book = await Book.findByIdAndUpdate(id, {
            name, author, description, price, available, image
        })

        book = await book.save()

    } catch (err) {
        console.log(err);
    }

    if (!book) {

        return res.status(404).json({ message: 'Unable to update by this id' })
    }

    return res.status(200).json({ book })

}

const deleteBook = async (req, res, next) => {
    
    const id = req.params.id

    let book;

    try {

        book = await Book.findByIdAndRemove(id)
    } catch (err) {

        console.log(err);
    }

    if (!book) {

        return res.status(404).json({ message: 'Unable to delete by this id' })
    }

    return res.status(200).json({ message: 'this book successfuly deleted' })

}



exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.UpdateBook = UpdateBook;
exports.deleteBook = deleteBook;
