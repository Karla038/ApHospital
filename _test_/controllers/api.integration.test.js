// _test_/controllers/api.integration.test.js

const request = require('supertest');
const app = require('../../index'); 

describe('API Integration Tests', () => {
    it('should create a user on POST /api/auth/new', async () => {
        const response = await request(app)
            .post('/api/auth/new')
            .send({
                email: 'carlamoya038@gmail.com',
                password: 'carlamoya038@gmail.com',
                role: 'DOCTOR',
                especialidad: '652af985f9ff24fa7ebaa896'
            });

        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should log in the user on POST /api/auth', async () => {
        const response = await request(app)
            .post('/api/auth')
            .send({
                email: 'carlamoya038@gmail.com',
                password: 'carlamoya038@gmail.com'
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
