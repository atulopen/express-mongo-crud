const express = require('express');
const router = require('./routes/V1/api');
const cors = require('cors');

const app = express();


app.use(cors({
    origin: '*',
}));

app.use(express.json());

app.use('/v1', router);


module.exports = app;