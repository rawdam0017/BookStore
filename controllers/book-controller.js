var mongoose = require('mongoose');

const Book = require("../model/Book")
const categorySchema = require("../model/category")
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
    BookCatalog.findOne({ name: req.body.categoryName }, function (err, category) {

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
                categoryId: req.body.categoryId,
            });
            category.save(function (err, data) {
                if (err) {
                    res.json(err);
                }
                else {
                    // res.json(data);
                }
            });
            const { name, author, description, price, available, image, categoryId } = req.body
            let book;

            try {

                book = new Book({
                    name,
                    author,
                    description,
                    price,
                    image,
                    available,
                    categoryId,
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

    const { name, author, description, price, available, image } = req.body
    let book;


    try {

        book = await Book.findByIdAndUpdate({ name: req.params.name }, {
            $set:{name, author, description, price, available, image}
        })

        if (!book) {

            return res.status(404).json({ message: 'Unable to update by this id' })
        }
        // book = await book.save()

        const category = await BookCatalog.findById(req.params.categoryId,
            {
                books: { $elemMatch: { name: req.params.name } }
            });
        console.log(category)
        if (!category) return res.status(404).send("Cateory is not found");
        const updateRes = await BookCatalog.findOneAndUpdate({ "_id": req.params.categoryId },
            {
                $set: { books: { name, author, description, price, available, image } }
            })

        return res.status(200).json({ updateRes })
    } catch (err) {
        console.log(err);
    }



}

const deleteBook = async (req, res, next) => {
    // router.delete('/:id/category/:categoryName', async (req, res) => {
    try {
        // const book = await Book.findOne({ name: req.params.name })
        // if (!book) return res.status(404).send("Book is not found");
        const category = await BookCatalog.findById(req.params.categoryId,
            {
                books: { $elemMatch: { name: req.params.name } }
            });
        console.log(category)
        if (!category) return res.status(404).send("Cateory is not found");
        const deldetRes = await BookCatalog.findOneAndUpdate({ "_id": req.params.categoryId },
            {
                $pull: { books: { "_id": category.books[0]._id } }
            })
        console.log(req.params)
        // book.remove();
        // category.books.remove(req.params.id);
        // category.save();
        console.log(category.books[0]._id);
        res.status(202)
            // .json();
            .send(deldetRes);
    } catch (error) {
        res.send(error.message);
    }
    //  book = Book.findByIdAndRemove(req.params.booksId);




    // if (!book) return res.status(404).send("Subcategory is not found");
    //   })
    //     const id = req.params.id

    //     let book;

    //     try {

    //     } catch (err) {

    //         console.log(err);
    //     }

    //     if (!book) {

    //         return res.status(404).json({ message: 'Unable to delete by this id' })
    //     }

    //     return res.status(200).json({ message: 'this book successfuly deleted' })

}



exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.UpdateBook = UpdateBook;
exports.deleteBook = deleteBook;
