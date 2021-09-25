const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://arthur_learning:dSb7b2ttopKXsLzs@nasacluster.otwsj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('Mongo Db Connection Successful!');
})

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to Mongo db ${err}`);
});

async function connectToMongo() {
    await mongoose.connect(MONGO_URL,
        {
            useNewUrlParser: true, useUnifiedTopology: true
        });
}

async function disconnectMongo() {
    await mongoose.disconnect();
}

module.exports = {
    connectToMongo,
    disconnectMongo,
}