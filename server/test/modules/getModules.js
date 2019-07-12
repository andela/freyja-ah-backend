import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import server from '../../index';

let userToken;

describe('GET /api/modules/#', () => {
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

  it('should get all modules', (done) => {
    request(server)
      .get('/api/modules/1')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.contents).to.be.an('array');
        done(err);
      });
  });
  it('should not get all modules if module is not found', (done) => {
    request(server)
      .get('/api/modules/8')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.be.a('number');
        expect(res.body.error).to.be.an('string');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
  it('throws a 403 is user is not authenticated', (done) => {
    request(server)
      .get('/api/modules/1')
      .set('authorization', 'badToken')
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql('token not verified');
        done(err);
      });
  });
});
