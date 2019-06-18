import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import server from '../../index';

let userToken;

describe('GET /api/messages', () => {
  before((done) => {
    const user = {
      email: 'ted123@mail.com',
      password: '12345678',
    };
    request(server)
      .post('/api/users/login')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });
  it('get all received messages', (done) => {
    request(server)
      .get('/api/messages/received')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        done(err);
      });
  });

  it('get all sent messages', (done) => {
    request(server)
      .get('/api/messages/sent')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        done(err);
      });
  });
});
