const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Test valid input GET /api/convert?input=10L', (done) => {
        chai
            .request(server)
            .get('/api/convert?input=10L')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.returnUnit, 'gal');
                assert.equal(res.body.returnNum, 2.64172);
                done();
            });
    });

    test('Test invalid unit GET /api/convert?input=32g', (done) => {
        chai
            .request(server)
            .get('/api/convert?input=32g')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid unit');
                done();
            });
    });

    test('Test invalid number GET /api/convert?input=3/7.2/4kg', (done) => {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number');
                done();
            });
    });

    test('Test invalid number and unit GET /api/convert?input=3/7.2/4kilograms', (done) => {
        chai
            .request(server)
            .get('/api/convert?input=3/7.2/4kilograms')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number and unit');
                done();
            });
    });

    test('Test input with no number GET /api/convert?input=kg', (done) => {
        chai
            .request(server)
            .get('/api/convert?input=kg')
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.returnUnit, 'lbs');
                assert.equal(res.body.returnNum, 2.20462);
                done();
            });
    });
});
