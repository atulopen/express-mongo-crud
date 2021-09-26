const {getAllPlanets} = require("../../../models/planets.model");

async function httpGetAllPlanets(req, res) {
    res.status(200);
    return res.json(await getAllPlanets());
}

module.exports = {
    httpGetAllPlanets
}