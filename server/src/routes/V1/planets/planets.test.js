const {connectToMongo, disconnectMongo} = require("../../../services/mongo");
const app = require('../../../app');
const request = require('supertest');

describe('Planets API', () => {
    beforeAll(async () => {
        await connectToMongo();
    });

    afterAll(async () => {
        await disconnectMongo();
    })


    describe('Test GET /launches', () => {

        test('should return json', async () => {
            await request(app)
                .get('/v1/planets')
                .expect('Content-Type', /json/)
                .expect(200);
        });

    })


});