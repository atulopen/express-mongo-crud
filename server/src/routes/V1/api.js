const express = require('express');
const planetsRouter = require('./planets/planets.route');
const launchesRouter = require('./launches/launches.route');
const router = express.Router();

router.use('/planets', planetsRouter);
router.use('/launches', launchesRouter);

module.exports = router;