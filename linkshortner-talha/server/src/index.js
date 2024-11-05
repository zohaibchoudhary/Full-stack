const express = require('express');
const redirect = require('./controllers/redirects.controller');
const url = require('./controllers/url.controller');
var cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ Message: 'Hi there' });
});

app.use('/', redirect);
app.use('/api/url', url);

// http://localhost:3000/api/url/shorten


module.exports = app;