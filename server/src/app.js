const express = require('express');
const router = require('./routes/V1/api');

const app = express();

app.use('/v1', router);


module.exports = app;