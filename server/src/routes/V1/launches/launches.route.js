const express = require('express');
const {httpGetAllLaunches, httpCreateLaunch} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpCreateLaunch);

module.exports = launchesRouter;