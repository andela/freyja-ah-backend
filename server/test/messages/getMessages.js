import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import faker from 'faker';

import server from '../../index';

let userToken;

let receiverId;

describe('GET /api/messages', async () => {
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
        receiverId = res.body.user.id;
        done();
      });
  });

  it('Sends a message on get messages', (done) => {
    const newMessage = {
      body: 'Hey bro welcome, how you doing',
      receiverId
    };
    request(server)
      .post('/api/messages')
      .set('authorization', userToken)
      .send(newMessage)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        done(err);
      });
  });
  it('get received message', (done) => {
    request(server)
      .get('/api/messages/received')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('data');
        done(err);
      });
  });
  it('get sent message', (done) => {
    request(server)
      .get('/api/messages/sent')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('data');
        done(err);
      });
  });
});
