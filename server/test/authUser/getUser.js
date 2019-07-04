import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';

use(chaihttp);
let userId;
let userToken;
describe('Post api/user', () => {
  before(done => {
    const user = {
      firstName: 'Tom',
      lastName: 'Cruise',
      userName: 'cruise',
      email: 'cruiserr@mail.com',
      password: '12345678',
    };
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        userId = res.body.user.id;
        userToken = res.body.token;
        done(err);
      });
  });

  it('get a registered user', done => {
    request(server)
      .get(`/api/user/${userId}`)
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.firstName).to.eql('Tom');
        expect(res.body.user.email).to.eql('cruiserr@mail.com');
        done(err);
      });
  });

  it('it returns a Notfound Error if the user is not registered', done => {
    request(server)
      .get('/api/user/100')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.message).to.eql('user not registered');
        done(err);
      });
  });
});
