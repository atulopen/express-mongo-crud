const {getAllLaunches, scheduleLaunch, abortLaunch} = require("../../../models/launches.model");

async function httpGetAllLaunches(req, res) {
    res.status(200);
    return res.json(await getAllLaunches());
}

async function httpCreateLaunch(req, res) {
    const launch = req.body;
    res.status(201);
    return res.json(await scheduleLaunch(launch));
}

async function httpAbortLaunch(req, res) {
    const {launchId} = req.params;
    res.status(200);
    return res.json(await abortLaunch(launchId));
}

module.exports = {
    httpGetAllLaunches,
    httpCreateLaunch,
    httpAbortLaunch
}