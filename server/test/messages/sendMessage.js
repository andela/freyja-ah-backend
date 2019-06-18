import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';
import Authenticate from '../../middleware/auth/Authenticate';

use(chaihttp);
let userToken, receiverId, newMessage;
const unknownUserToken = Authenticate.generateToken(2000, 'unknown@mail.com', 'unknown');
const messageUrl = '/api/messages';

describe('Testing Sending a Private Message - POST api/messages', () => {
  before((done) => {
    const user = {
      firstName: 'Morgan',
      lastName: 'Freeman',
      userName: 'morgan',
      email: 'morgan@mail.com',
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

  before((done) => {
    const user = {
      firstName: 'Forest',
      lastName: 'Whitaker',
      userName: 'whitty',
      email: 'forest@mail.com',
      password: '12345678',
      gender: 'male'
    };
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        receiverId = res.body.user.id;
        newMessage = {
          body: 'Hey Whitaker, how you doing',
          receiverId
        };
        done(err);
      });
  });

  it('Sends a message', (done) => {
    request(server)
      .post(messageUrl)
      .set('authorization', userToken)
      .send(newMessage)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.be.an('object');
        expect(res.body.message).to.have.property('body');
        expect(res.body.message).to.have.property('senderId');
        expect(res.body.message.receiverId).to.equal(receiverId);
        done(err);
      });
  });

  it('It should return user does not exist if the sender does not exist', (done) => {
    request(server)
      .post(messageUrl)
      .set('authorization', unknownUserToken)
      .send(newMessage)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.eql('This user does not exist');
        done(err);
      });
  });

  it('It should return recipient does not exist if recipientId is wrong', (done) => {
    const invalidMsg = Object.assign({}, newMessage, {
      receiverId: 4000
    });

    request(server)
      .post(messageUrl)
      .set('authorization', userToken)
      .send(invalidMsg)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.eql('The message recipient does not exist');
        done(err);
      });
  });

  it('Should return 422(Unprocessable Entity) when a user enters invalid data', (done) => {
    const invalidMsg = Object.assign({}, newMessage, {
      body: ''
    });

    request(server)
      .post(messageUrl)
      .set('authorization', userToken)
      .send(invalidMsg)
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.eql(422);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.an('array');
        done(err);
      });
  });
});
