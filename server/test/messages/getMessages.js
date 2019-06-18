import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import faker from 'faker';

import server from '../../index';

let userToken;

describe('GET /api/messages', async () => {
  before((done) => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'december',
      confirmPassword: 'december',
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

  it('get no message', (done) => {
    request(server)
      .get('/api/messages/received')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('no recieved messages');
        done(err);
      });
  });
});
