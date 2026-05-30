import request from 'supertest';
import app from '../../app';

export const createAndLoginUserAndGetToken = async () => {

    const email = `test${Date.now()}@test.com`;

    await request(app)
        .post('/api/auth/register')
        .send({
            username: `user${Date.now()}`,
            email,
            password: "123456",
        });

    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email,
            password: '123456',
        });

    return response.body.data.token;

}



export const createLoginAndGetUser = async () => {

    const email = `test${Date.now()}@test.com`;

    await request(app)
        .post('/api/auth/register')
        .send({
            username: `user${Date.now()}`,
            email,
            password: "123456",
        });

    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email,
            password: '123456',
        });

    return response;

}