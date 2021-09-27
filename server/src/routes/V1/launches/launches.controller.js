const {getAllLaunches, scheduleLaunch} = require("../../../models/launches.model");

async function httpGetAllLaunches(req, res) {
    res.status(200);
    res.json(await getAllLaunches());
}

async function httpCreateLaunch(req, res) {
    const launch = req.body;
    res.status(200);
    return res.json(await scheduleLaunch(launch));
}

module.exports = {
    httpGetAllLaunches,
    httpCreateLaunch
}