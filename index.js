const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const axios = require('axios');
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

const backURL = 'http://localhost:5500/';

app.get('/', async (req, res) => {
    const books = await axios.get(backURL + 'books');
    const getbooks = books.data;
    res.render('index', {getbooks});
});

app.get('/books', async (req, res) => {
    const books = await axios.get(backURL + 'books');
    const getbooks = books.data;
    res.send(getbooks);
})

// เพิ่มข้อมูล
app.get('/Addbook', (req, res) => {
    res.render('addbooks');
});

app.post('/Addbook', async (req, res) => {
    const Addbook = req.body;
    await axios.post(backURL + 'books', Addbook);
    res.redirect('/');
});

// แก้ไขข้อมูล
app.get('/Editbook/:id', async (req, res) => {
    const book = await axios.get(backURL + `books/${req.params.id}`);
    const getEditbooks = book.data[0];
    res.render('Editbook', {getEditbooks});
});

app.post('/Editbook/:id', async (req, res) => {
    const Editbook = req.body;
    await axios.put(backURL + `books/${req.params.id}`, Editbook);
    res.redirect('/');
});

// ลบข้อมูล
app.get('/deleteBook/:id', async (req, res) => {
    await axios.delete(backURL + `books/${req.params.id}`);
    res.redirect('/');
});

// รันเซิฟเวอร์
app.listen(PORT, () => {
    console.log(`Web Appication Server Running http://localhost:${PORT}`);
});
