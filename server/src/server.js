const http = require('http');
const app = require('./app');
const {connectToMongo} = require("./services/mongo");
const {loadData} = require("./models/planets.model");
const {loadLaunchesData} = require("./models/launches.model");
const PORT = 8000;


const server = http.createServer(app);


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