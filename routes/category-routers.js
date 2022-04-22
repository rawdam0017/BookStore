var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../model/category');
var Book = require('../model/Book');

/* GET /categories listing. */
router.get('/', function(req, res, next) {
  Category.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /categories */
router.post('/', function(req, res, next) {
  Category.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /categories/id */
router.get('/:id', function(req, res, next) {
  Category.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /categories/:id */
router.put('/:id', function(req, res, next) {
  Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /categories/:id */
router.delete('/:id', function(req, res, next) {
  Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// const booksId = Book.findById(req.params.id)

router.delete('/:id/books/:categoryId', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if(!category) return res.status(404).send("Cateory is not found");
    category.books.remove( req.params.booksId );
    category.save();
    const book = await Book.findByIdAndRemove(req.params.booksId);
    if(!book) return res.status(404).send("Subcategory is not found");
    res.status(202).send("Subcategory is deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
})

module.exports = router;