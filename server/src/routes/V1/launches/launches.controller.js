const {getAllLaunches} = require("../../../models/launches.model");

async function httpGetAllLaunches(req, res) {
    res.status(200);
    res.json(await getAllLaunches());
}

module.exports = {
    httpGetAllLaunches
}