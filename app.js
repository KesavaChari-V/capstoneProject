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
        reviews: []
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

// Task 10: Get all books – Using async callback function
app.get('/async/books', async (req, res) => {
    try {
        const books = await new Promise((resolve) => {
            resolve(sampleBooks);
        });
        res.json(books);
    } catch (error) {
        res.status(500).send('Error retrieving books');
    }
});

// Task 11: Search by ISBN – Using Promises
app.get('/books/isbn/:isbn', (req, res) => {
    const isbnToFind = req.params.isbn;

    const findBookByISBN = new Promise((resolve, reject) => {
        const book = sampleBooks.find(b => b.isbn === isbnToFind);
        if (book) {
            resolve(book);
        } else {
            reject('Book not found');
        }
    });

    findBookByISBN
        .then(book => res.json(book))
        .catch(error => res.status(404).send(error));
});

// Task 12: Search by Author – Using Promises
app.get('/books/author/:author', (req, res) => {
    const authorToFind = req.params.author;

    const findBooksByAuthor = new Promise((resolve, reject) => {
        const booksByAuthor = sampleBooks.filter(b => b.author.toLowerCase() === authorToFind.toLowerCase());
        if (booksByAuthor.length > 0) {
            resolve(booksByAuthor);
        } else {
            reject('No books found by this author');
        }
    });

    findBooksByAuthor
        .then(books => res.json(books))
        .catch(error => res.status(404).send(error));
});

// Task 13: Search by Title
app.get('/books/title/:title', (req, res) => {
    const titleToFind = req.params.title;

    const findBooksByTitle = new Promise((resolve, reject) => {
        const booksByTitle = sampleBooks.filter(b => b.title.toLowerCase().includes(titleToFind.toLowerCase()));
        if (booksByTitle.length > 0) {
            resolve(booksByTitle);
        } else {
            reject('No books found with this title');
        }
    });

    findBooksByTitle
        .then(books => res.json(books))
        .catch(error => res.status(404).send(error));
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
    res.json({ message: "User registered successfully", user: req.body });
});

// User Login (Simulated)
app.post('/users/login', (req, res) => {
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
