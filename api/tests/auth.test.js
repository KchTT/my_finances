const request = require('supertest')
const app = require('../index')
const moment = require('moment')

describe('Login post', () => {
    it('should login', async () => {
        const res = await request(app)
            .post('/api/v1/auth/sign_in')
            .send({
                email: "martinbronzino@gmail.com",
                pass: '1234',
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.err).toBe(false)
    })

    it('reject login, user not exist', async () => {
        const res = await request(app)
            .post('/api/v1/auth/sign_in')
            .send({
                email: "mjb@gmail.com",
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
            { pass: "", email: "" },
            { pass: "asasa", email: "asas" }
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

describe('Sign Up test', () => {
    it('should register ok', async () => {
        const res = await request(app)
            .post('/api/v1/auth/sign_up')
            .send({
                email: moment().format("YYYYMMDDHHmmss")+"_test@gmail.com",
                pass: '1234',
                name: 'John',
                lastname: 'Doe'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('err')
        expect(res.body.err).toBe(false)
        expect(res.body).toHaveProperty('message')
    })

    it('reject because already exist', async () => {
        const res = await request(app)
            .post('/api/v1/auth/sign_up')
            .send({
                email: "martinbronzino@gmail.com",
                pass: '1234',
                name: 'John',
                lastname: 'Doe'
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('err')
        expect(res.body.err).toBe(true)
        expect(res.body).toHaveProperty('message')
    })

    it('reject because body error', async () => {
        const body_cases = [
            { email: "123" },
            { pass: "aammm" },
            {},
            { pass: "", email: "" },
            { pass: "asasa", email: "asas" }
        ]
        for (const body_case of body_cases) {
            const res = await request(app)
                .post('/api/v1/auth/sign_up')
                .send(body_case)
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('err')
            expect(res.body.err).toBe(true)
            expect(res.body).toHaveProperty('message')
        }
    })
    
})

describe('Transactions', () => {
    let token = "";
    beforeAll(async () => {
        //request(baseUrl)
        const response = await request(app).post("/api/v1/auth/sign_in").send({
            email: "martinbronzino@gmail.com",
            pass: "1234",
        });
        token = response.body.t;
    });

    /*let _request;
    beforeEach(async () => {
        _request = request(app)
            .set('Authorization', 'Bearer '+token)
        ;
    });*/

    it('should add a transaction ok', async () => {
        const res = await request(app)
            .post('/api/v1/transactions')
            .set('Authorization', 'Bearer '+token)
            .send({
                date:"2023-01-01 22:22:22",
                operation:1,
                id_category:1,
                description:"Test transaction",
                amount:35
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('err')
        expect(res.body.err).toBeFalsy()
        expect(res.body).toHaveProperty('transaction')
    })

    it('should update a transaction ok', async () => {
        const res = await request(app)
            .put('/api/v1/transactions/1')
            .set('Authorization', 'Bearer '+token)
            .send({
                date:"2023-01-01 22:22:22",
                operation:1,
                id_category:1,
                description:"Test transaction",
                amount:35
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('err')
        expect(res.body.err).toBeFalsy()
        expect(res.body).toHaveProperty('transaction')
    })

    it('should reject the update because the properties are incomplete', async () => {
        const res = await request(app)
            .put('/api/v1/transactions/1')
            .set('Authorization', 'Bearer '+token)
            .send({
                id_category:1,
                description:"Test transaction",
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('err')
        expect(res.body).toHaveProperty('message')
    })
})