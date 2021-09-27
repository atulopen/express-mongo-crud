const {getAllLaunches, scheduleLaunch, abortLaunch} = require("../../../models/launches.model");

async function httpGetAllLaunches(req, res) {
    res.status(200);
    return res.json(await getAllLaunches());
}

async function httpCreateLaunch(req, res) {
    const launch = req.body;

    if (!launch.target || !launch.rocket || !launch.mission || !launch.launchDate) {
        res.status(400);
        return res.json({error: "Required missing fields"});
    }

    const launchDate = Date.parse(launch.launchDate);
    if (isNaN(launchDate)) {
        res.status(400);
        return res.json({error: "Incorrect Launch Date"});
    }
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