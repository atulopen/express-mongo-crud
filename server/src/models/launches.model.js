const launchesDatabase = require('./launches.mongo');
const planetsDatabase = require('./planets.mongo');


const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: DEFAULT_FLIGHT_NUMBER,
    launchDate: '23 December, 2021',
    target: 'Kepler-1410 b',
    rocket: 'testing rocket',
    mission: 'testing mission',
    customers: ['ZTM', 'ARTHUR'],
    success: true,
    upcoming: true,
}

async function saveLaunch(launch) {

    const planet = await planetsDatabase.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('Planet not found');
    }


    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

saveLaunch(launch);

async function getAllLaunches() {
    return launchesDatabase.find({});
}

module.exports = {
    getAllLaunches
}