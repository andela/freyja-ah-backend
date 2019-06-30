import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';
import tokenHandler from '../../middleware/auth/Authenticate';

use(chaihttp);
let userToken;
const userToken2 = tokenHandler.generateToken(100, 'nouser@mail.com', 'noUser');

describe('Post api/user', () => {
  before((done) => {
    const user = {
      firstName: 'Tom',
      lastName: 'Cruise',
      userName: 'cruise',
      email: 'cruising@mail.com',
      password: '12345678',
      gender: 'male'
    };
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token;
        done(err);
      });
  });

  it('update a registered user', (done) => {
    request(server)
      .put('/api/user/')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.firstName).to.eql('Tom');
        expect(res.body.user.email).to.eql('cruising@mail.com');
        done(err);
      });
  });

  it('it returns a Notfound Error if the user is not registered', (done) => {
    request(server)
      .put('/api/user')
      .set('Authorization', userToken2)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.message).to.eql('User does not exist');
        done(err);
      });
  });
});
