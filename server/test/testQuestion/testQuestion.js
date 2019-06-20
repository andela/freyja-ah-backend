import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import server from '../../index';

let UserToken;
describe('GET /api/tests/:moduleId', () => {
  it('should return error when module Id is invalid', (done) => {
    request(server)
      .get('/api/tests/hjs')
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
  });
  it('should return no found test if it does not find any test with the module id', (done) => {
    request(server)
      .get(`/api/tests/${99}`)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql('failed');
        expect(res.body.error).to.eql('No test for found for the specified module Id');
        done();
      });
  });
  it('should return the found test when module Id is correct', (done) => {
    request(server)
      .get(`/api/tests/${1}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});

describe('Post /api/tests/answer/:testId', () => {
  before((done) => {
    request(server)
      .post('/api/users/login')
      .send({
        email: 'ted123@mail.com',
        password: '12345678'
      })
      .end((err, res) => {
        UserToken = res.body.token;
        done();
      });
  });
  it('should return error when invalid test id is passed along the request', (done) => {
    request(server)
      .post('/api/tests/answer/shd')
      .send({ score: 70 })
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.eql(422);
        expect(res.body.error).to.eql('Invalid test Id');
        done();
      });
  });
  it('should return error when the test isnt found', (done) => {
    request(server)
      .post(`/api/tests/answer/${99}`)
      .set('authorization', UserToken)
      .send({ score: 70 })
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql('failed');
        expect(res.body.error).to.eql('Test not found');
        done();
      });
  });
  it('should save the user test to the database', (done) => {
    request(server)
      .post(`/api/tests/answer/${1}`)
      .set('authorization', UserToken)
      .send({ score: 70 })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should save already passed test to the database', (done) => {
    request(server)
      .post(`/api/tests/answer/${1}`)
      .set('authorization', UserToken)
      .send({ score: 70 })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
