const express = require('express');
const router = require('./routes/V1/api');
const cors = require('cors');
const path = require('path');

const app = express();


app.use(cors({
    origin: '*',
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/v1', router);

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})


module.exports = app;