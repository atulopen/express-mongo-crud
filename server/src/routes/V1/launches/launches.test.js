const {connectToMongo, disconnectMongo} = require("../../../services/mongo");
const request = require('supertest');
const app = require('../../../app');

describe('Launches Api', () => {
    beforeAll(async () => {
        await connectToMongo();
    });

    afterAll(async () => {
        await disconnectMongo();
    });

    describe('Testing GET /launches', () => {
        test('it should return json', async () => {
            await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200);
        })
    })

    describe('Testing POST /launches', () => {
        const launch = {
            launchDate: '23 December, 2021',
            target: 'Kepler-1410 b',
            rocket: 'unit testing rocket',
            mission: 'unit testing mission',
            customers: ['ZTM', 'ARTHUR'],
            success: true,
            upcoming: true,
        }
        test('it should return 201 response', async () => {

            await request(app)
                .post('/v1/launches')
                .send(launch)
                .expect('Content-Type', /json/)
                .expect(201);

        })
    });
});