const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const axios = require('axios');
const PORT = 5000;

app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

// รันเซิฟเวอร์
app.listen(PORT, () => {
    console.log(`Web Appication Server Running http://localhost:${PORT}`);
});
