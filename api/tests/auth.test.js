const request = require('supertest')
const app = require('../index')

describe('Login post', () => {
    it('should login', async () => {
        const res = await request(app)
            .post('/api/v1/auth/sign_in')
            .send({
                email: 1,
                pass: 'test is cool',
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('post')
    })

    it('reject login, user not exist', async () => {
        const res = await request(app)
            .post('/api/v1/auth/sign_in')
            .send({
                email: "1",
                pass: 'test is cool',
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('message')
    })

    it('reject login because body error', async () => {
        const body_cases = [
            { email: "123" },
            { pass: "aammm" },
            {},
            { pass: "", email: "" }
        ]
        for (const body_case of body_cases) {
            const res = await request(app)
                .post('/api/v1/auth/sign_in')
                .send(body_case)
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message')
        }
    })
})