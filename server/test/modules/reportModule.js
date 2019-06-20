import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import faker from 'faker';
import server from '../../index';

let userToken;

describe('POST /api/modules/report/:moduleId', () => {
  before((done) => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'december',
      userName: 'beejay',
      gender: 'male'
    };
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });
  it('should return error when module Id is invalid', (done) => {
    request(server)
      .post('/api/modules/report/jsd')
      .set('authorization', userToken)
      .send({ reason: 'Bad', comment: 'very bad' })
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.eql(422);
        expect(res.body.error).to.eql('Invalid module id');
        done();
      });
  });
  it('should return error when module is not found', (done) => {
    request(server)
      .post(`/api/modules/report/${99}`)
      .set('authorization', userToken)
      .send({ reason: 'Bad', comment: 'very bad' })
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql(404);
        expect(res.body.error).to.eql('Module not found');
        done();
      });
  });
  it('should report the module successfully', (done) => {
    request(server)
      .post(`/api/modules/report/${1}`)
      .set('authorization', userToken)
      .send({ reason: 'Bad', comment: 'very bad' })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data.message).to.eql('Module was reported successfully');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});
