const launchesDatabase = require('./launches.mongo');
const planetsDatabase = require('./planets.mongo');
const axios = require('axios');
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';


const DEFAULT_FLIGHT_NUMBER = 100;

async function populateLaunches() {

    console.log('Downloading Launches...');

    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });

    if (response.status !== 200) {
        console.log('Problem downloading launches!');
        throw new Error('Problem downloading launches!');
    }

    const launchDocs = response.data.docs;

    for (let launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap(payload => {
            return payload['customers'];
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            launchDate: new Date(launchDoc['date_local']),
            rocket: launchDoc['rocket']['name'],
            mission: launchDoc['name'],
            customers,
            success: launchDoc['success'],
            upcoming: launchDoc['upcoming'],
        }

        await saveLaunch(launch);
    }
}

async function findLaunches(filter) {
    return launchesDatabase.findOne(filter);
}

async function loadLaunchesData() {
    const firstLaunch = await findLaunches({
        flightNumber: 1,
        mission: 'FalconSat',
        rocket: 'Falcon 1',
    })

    if (firstLaunch) {
        console.log('Launches already downloaded!');
    } else {
        await populateLaunches();
    }
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
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

async function getAllLaunches(skip, limit) {
    return launchesDatabase
        .find({})
        .sort({flightNumber: 1})
        .skip(skip)
        .limit(limit);
}

async function scheduleLaunch(launch) {

    const planet = await planetsDatabase.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('No Matching Planet Found!');
    }

    const latestFlightNumber = await getLatestFlightNumber();
    const flightNumber = latestFlightNumber + 1;
    Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['ZTM', 'ARTHUR'],
        flightNumber,
    })

    await saveLaunch(launch);
}

async function abortLaunch(launchId) {
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launchId
    }, {
        success: false,
        upcoming: false,
    });
}

module.exports = {
    getAllLaunches,
    scheduleLaunch,
    abortLaunch,
    loadLaunchesData
}