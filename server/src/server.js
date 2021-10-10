const https = require('https');
const fs = require('fs');
const app = require('./app');
require('dotenv').config();
const {connectToMongo} = require("./services/mongo");
const {loadData} = require("./models/planets.model");
const {loadLaunchesData} = require("./models/launches.model");
const path = require("path");
const PORT = process.env.PORT || 8000;


const server = https.createServer({
    cert: fs.readFileSync(path.join(__dirname, '..', 'cert.pem')),
    key: fs.readFileSync(path.join(__dirname, '..', 'key.pem')),
}, app);


server.on('error', (err) => {
    console.log(err);
})

async function connectServer() {
    await connectToMongo();
    await loadData();
    await loadLaunchesData();


    server.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    })

}

connectServer();