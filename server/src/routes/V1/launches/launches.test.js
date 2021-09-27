const {connectToMongo, disconnectMongo} = require("../../../services/mongo");
const request = require('supertest');
const app = require('../../../app');
const {json} = require("express");

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

        const incompleteLaunch = {
            customers: ['ZTM', 'ARTHUR'],
            success: true,
            upcoming: true,
        }
        const completeLaunch = {
            launchDate: '23 December, 2021',
            target: 'Kepler-1410 b',
            rocket: 'unit testing rocket',
            mission: 'unit testing mission',
            ...incompleteLaunch
        };

        test('it should return 201 response', async () => {

            await request(app)
                .post('/v1/launches')
                .send(completeLaunch)
                .expect('Content-Type', /json/)
                .expect(201);
        })

        test('it should handle the validations', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(incompleteLaunch)
                .expect('Content-Type', /json/)
                .expect(400);
        });

        test('it should handle incorrect date', async () => {
            const post = {
                ...completeLaunch,
                launchDate: 'incorrect'
            }

            const response = await request(app)
                .post('/v1/launches')
                .send(post)
                .expect('Content-Type', /json/)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: "Incorrect Launch Date"
            });
        });
    });
});