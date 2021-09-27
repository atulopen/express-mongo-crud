const fs = require('fs');
const path = require('path');
const parse = require('csv-parse');
const planetsDatabase = require('./planets.mongo');

const isHabitablePlanet = (planet) => {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}


function loadData() {

    return new Promise(((resolve, reject) => {

        const file = fs.createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv')).pipe(parse({
            comment: "#",
            columns: true,
        }));


        file.on('data', async (data) => {
            if (isHabitablePlanet(data)) {
                await planetsDatabase.updateOne({
                    keplerName: data.kepler_name
                }, {
                    keplerName: data.kepler_name
                }, {
                    upsert: true
                });
            }
        });

        file.on('error', (err) => {
            console.log(err);
            reject(err);
        });


        file.on('end', async () => {
            const planets = await getAllPlanets();
            console.log(`${planets.length} planets found`);
            resolve();
        })
    }))
}

async function getAllPlanets() {
    return planetsDatabase.find({});
}

module.exports = {
    loadData,
    getAllPlanets,
}

