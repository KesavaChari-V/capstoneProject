const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample books object
let sampleBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        reviews: []
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780061120084",
        reviews: ['Very Good Book']
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        isbn: "9780451524935",
        reviews: []
    }
];

// General User Tasks

// Task 1: Get the book list available in the shop
app.get('/books', (req, res) => {
    res.json(sampleBooks);
});

// Task 2: Get the books based on ISBN
app.get('/books/isbn/:isbn', (req, res) => {
    const book = sampleBooks.find(b => b.isbn === req.params.isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Task 3: Get all books by Author
app.get('/books/author/:author', (req, res) => {
    const booksByAuthor = sampleBooks.filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
    res.json(booksByAuthor);
});

// Task 4: Get all books based on Title
app.get('/books/title/:title', (req, res) => {
    const booksByTitle = sampleBooks.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
    res.json(booksByTitle);
});

// Task 5: Get book Review
app.get('/books/:id/reviews', (req, res) => {
    const book = sampleBooks.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.json(book.reviews);
    } else {
        res.status(404).send('Book not found');
    }
});

// User Registration (Simulated)
app.post('/users/register', (req, res) => {
    // Simulate successful registration
    res.json({ message: "User registered successfully", user: req.body });
});

// User Login (Simulated)
app.post('/users/login', (req, res) => {
    // Simulate successful login
    res.json({ message: "User logged in successfully", user: req.body });
});

// Registered User Tasks

// Task 8: Add/Modify a book review
app.post('/books/:id/reviews', (req, res) => {
    const book = sampleBooks.find(b => b.id === parseInt(req.params.id));
    if (book) {
        book.reviews.push(req.body);
        res.json({ message: "Review added successfully", reviews: book.reviews });
    } else {
        res.status(404).send('Book not found');
    }
});

// Task 9: Delete book review added by that particular user
app.delete('/books/:bookId/reviews/:reviewIndex', (req, res) => {
    const book = sampleBooks.find(b => b.id === parseInt(req.params.bookId));
    if (book && book.reviews[req.params.reviewIndex]) {
        book.reviews.splice(req.params.reviewIndex, 1);
        res.json({ message: "Review deleted successfully", reviews: book.reviews });
    } else {
        res.status(404).send('Review not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
