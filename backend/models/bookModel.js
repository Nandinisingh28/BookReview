const mongoose = require('mongoose');

// Define the ReviewSchema
const ReviewSchema = new mongoose.Schema({
    reviewer: String,
    comment: String,
    rating: Number
  });

// Define the BookSchema
const BookSchema = new mongoose.Schema({
    name: String,
    id: String,
    image : String,
    reviews: [ReviewSchema] // Add an array of ReviewSchema objects
  }, {
    collection: 'books' // the collection to use for this schema
  });

const BookModel = mongoose.model("booksbooks",BookSchema); 

module.exports = BookModel;