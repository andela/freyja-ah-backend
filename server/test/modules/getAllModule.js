import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import server from '../../index';

let userToken;

describe('GET /api/modules', () => {
  before((done) => {
    request(server)
      .post('/api/users/login')
      .send({ email: 'ted123@mail.com', password: '12345678' })
      .end((err, res) => {
        const { token } = res.body;
        userToken = token;
        done(err);
      });
  });
  it('get all modules', (done) => {
    request(server)
      .get('/api/modules')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        done(err);
      });
  });
  it('throws a 401 is user is not authenticated', (done) => {
    request(server)
      .get('/api/modules')
      .set('authorization', 'badToken')
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql('token not verified');
        done(err);
      });
  });
});
