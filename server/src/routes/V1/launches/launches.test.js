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
});