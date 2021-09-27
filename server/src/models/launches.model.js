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

async function getLatestFlightNumber() {
    const launch = await launchesDatabase.findOne().sort({
        flightNumber: -1
    });
    if (!launch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return launch.flightNumber;
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

async function scheduleLaunch(launch) {
    const latestFlightNumber  = await getLatestFlightNumber();
    const flightNumber = latestFlightNumber + 1;
    Object.assign(launch, {
        success: true,
        upcoming: true,
        flightNumber,
    })

   await saveLaunch(launch);
}

module.exports = {
    getAllLaunches,
    scheduleLaunch
}