// Deceased Females jest unit tests
// Used Brother Birch's Jest unit tests as a template: https://github.com/byui-cse/cse341-code-student/blob/L12-class-complete/__tests__/get.spec.js

const app = require('../server')
const supertest = require('supertest');
const {
    expect
} = require('@jest/globals');
const request = supertest(app)

    describe('Test Handlers', () => {
        test('responds to /dFemales', async () => {
            const res = await request.get('/dFemales');
            expect(res.header['content-type']).toBe('text/html; charset=utf-8');
            expect(res.statusCode).toBe(500)
        })

        test('responds to /dFemales', async () => {
            const res = await request.get('/dFemales/001');
            expect(res.header['content-type']).toBe('text/html; charset=utf-8');
            expect(res.statusCode).toBe(500)
        })
    })