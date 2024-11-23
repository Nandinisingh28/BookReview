const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const UserModel = require('./models/userModel');
const BookModel = require('./models/bookModel');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.get('/books', async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const skip = (page - 1) * (limit || 0);

    let books;
    if (limit) {
      books = await BookModel.find().skip(skip).limit(limit);
    } else {
      books = await BookModel.find();
    }
    const totalBooks = await BookModel.countDocuments();

    res.send({
      page: page,
      limit: limit || totalBooks,
      totalBooks: totalBooks,
      totalPages: limit ? Math.ceil(totalBooks / limit) : 1,
      books: books
    });
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.get('/books/:id', async function (req, res) {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findOne({ id: bookId });
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send({ book: book });
  } catch (err) {
    console.error('Error fetching book by id:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
})

app.get('/api/users',bodyParser.json() ,async function (req, res) {
  const users = await UserModel.find({});
  res.send({"users" : users});
});

app.get('/api/users/:id', bodyParser.json(), async function (req, res) {
  try {
    const user = await UserModel.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ user: user });
  } catch (err) {
    console.error('Error fetching user by id:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


app.put('/api/users/:id', bodyParser.json(), async function (req, res) {
  try {
    const user = await UserModel.findOneAndUpdate({id : req.params.id}, req.body, { new: true });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ user: user });
  } catch (err) {
    console.error('Error updating user by id:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.post('/api/users', bodyParser.json(), async function (req, res) {
  try {
    const newUser = new UserModel(req.body);

    const savedUser = await newUser.save();
    res.status(201).send({ user: savedUser });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.post('/books', async function (req, res) {
  try {
    const newBook = new BookModel(req.body);
    const savedBook = await newBook.save();
    res.status(201).send({ book: savedBook });
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route to get all reviews for a given book
app.get('/reviews/:id', async function (req, res) {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findOne({ id: bookId });
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }
    res.send({ reviews: book.reviews });
  } catch (err) {
    console.error('Error fetching reviews for book:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route to submit a new review for a given book
app.post('/reviews/:id', async function (req, res) {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findOne({ id: bookId });
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    }

    const newReview = {
      reviewer: req.body.reviewer,
      comment: req.body.comment,
      rating: req.body.rating
    };

    book.reviews.push(newReview);
    await book.save();

    res.status(201).send({ review: newReview });
  } catch (err) {
    console.error('Error submitting review for book:', err);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.listen(3001,console.log(`Server running on port 3001`));
