const express = require('express');

const launchesRouter = express.Router();

launchesRouter.get('/', (req, res) => {
    res.json({
        success: true,
    })
});

module.exports = launchesRouter;