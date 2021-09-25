const http = require('http');
const app = require('./app');
const {connectToMongo} = require("./services/mongo");
const PORT = 8000;


const server = http.createServer(app);


server.on('error', (err) => {
    console.log(err);
})

async function connectServer() {
    await connectToMongo();

    server.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    })

}

connectServer();