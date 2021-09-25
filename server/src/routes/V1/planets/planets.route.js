const express = require("express");
const planetsRouter = express.Router();

planetsRouter.get('/', (req, res) => {
    res.json({
        success: true,
    })
});

module.exports = planetsRouter;