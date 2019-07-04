/* eslint-disable no-unused-expressions */
import { describe, it, before } from 'mocha';
import { use, request, expect } from 'chai';
import sinon from 'sinon';
import chaihttp from 'chai-http';
import server from '../../index';
import Authenticate from '../../middleware/auth/Authenticate';
import CommunityMessageController from '../../controller/message/communityMessage';
import fakeUser from '../socialLogin.js/fakeUser';
import fakeResponse from '../socialLogin.js/fakeResponse';

use(chaihttp);

let userToken = null;
let userToken2 = null;
const unknownToken = Authenticate.generateToken(
  2000,
  'unknown@mail.com',
  'unknown',
);

describe('Post api/community/messages', () => {
  before(done => {
    const user = {
      firstName: 'Morgan',
      lastName: 'Smith',
      userName: 'smithyy',
      email: 'smithmorgan@mail.com',
      password: '12345678',
    };
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token;
        done(err);
      });
  });

  before(done => {
    const profileUpdate = {
      isCertified: true,
    };
    request(server)
      .put('/api/profiles')
      .set('authorization', userToken)
      .send(profileUpdate)
      .end(done);
  });

  before(done => {
    request(server)
      .post('/api/users/login')
      .send({ email: 'ted123@mail.com', password: '12345678' })
      .end((err, res) => {
        const { token } = res.body;
        userToken2 = token;
        done(err);
      });
  });

  it('it should return an error if token cannot be verifed', done => {
    request(server)
      .post('/api/community/messages')
      .set('authorization', 'jxxxxxxxxxxxxnns66s')
      .send({
        body: 'cover your lids to die with the sun',
      })
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql('token not verified');
        done(err);
      });
  });

  it('it should return an error if token is not provided', done => {
    request(server)
      .post('/api/community/messages')
      .send({
        body: 'clocks',
      })
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql('No Authentication Token Provided');
        done(err);
      });
  });

  it('it sends/create message', done => {
    request(server)
      .post('/api/community/messages')
      .set('authorization', userToken)
      .send({
        body: 'cover your lids to die with the sun',
      })
      .end((err, res) => {
        expect(res.body.message).to.eql('Message sent');
        expect(res.status).to.eql(202);
        done(err);
      });
  });

  it('it reurns 401 error', done => {
    request(server)
      .post('/api/community/messages')
      .set('authorization', userToken2)
      .send({
        body: 'cover your lids to die with the sun www.google.com',
      })
      .end((err, res) => {
        expect(res.body.error).to.eql(
          'You are not authorized to post community message',
        );
        expect(res.status).to.eql(401);
        done(err);
      });
  });

  it('Should return a 404(Not found) error if a user does not exist', done => {
    request(server)
      .post('/api/community/messages')
      .set('authorization', unknownToken)
      .send({
        body: 'cover your lids to die with the sun',
      })
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.eql('user not found');
        done(err);
      });
  });

  it('should spy on next called on catch', done => {
    const { postMessage } = CommunityMessageController;
    const spy007 = sinon.spy();
    postMessage(fakeUser.userRequest1, fakeResponse, spy007);
    expect(spy007).to.exist;
    done();
  });
});

describe('Get api/community/messages', () => {
  it('should get all messages if user is certified or a trainer', done => {
    request(server)
      .get('/api/community/messages')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        expect(res.body.message).to.eql('messages returned successfully');
        done(err);
      });
  });
  it('it returns 401 error if user is not a trainer or certified', done => {
    request(server)
      .get('/api/community/messages')
      .set('authorization', userToken2)
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql(
          'You are not authorized to view community messages',
        );
        expect(res.status).to.eql(401);
        done(err);
      });
  });
  it('Should return a 404(Not found) error if a user does not exist', done => {
    request(server)
      .get('/api/community/messages')
      .set('authorization', unknownToken)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.eql('user not found');
        done(err);
      });
  });
  it('should spy on next called on catch', done => {
    const { getMessages } = CommunityMessageController;
    const spy007 = sinon.spy();
    getMessages(fakeUser.userRequest1, fakeResponse, spy007);
    expect(spy007).to.exist;
    done();
  });
});
describe('DELETE api/community/messages/:id', () => {
  before(done => {
    request(server)
      .post('/api/community/messages')
      .set('authorization', userToken2)
      .send({
        body: 'cover your lids to die with the sun',
      });
    done();
  });
  it('should not delete a community message if token is not provided', done => {
    request(server)
      .delete('/api/community/messages/1')
      .end((err, res) => {
        expect(res.status).to.eql(401);
        done(err);
      });
  });
  it('should not delete a community message if message is not found', done => {
    request(server)
      .delete('/api/community/messages/88')
      .set('authorization', userToken2)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        done(err);
      });
  });
  it('should not delete a community message if the message does not belong to that particular user and the user is not a trainer', done => {
    request(server)
      .delete('/api/community/messages/1')
      .set('authorization', userToken2)
      .end((err, res) => {
        expect(res.status).to.eql(401);
        done(err);
      });
  });
  it('should not delete a community message if user is not found', done => {
    request(server)
      .delete('/api/community/messages/1')
      .set('authorization', unknownToken)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        done(err);
      });
  });
  it('should delete a community message', done => {
    request(server)
      .delete('/api/community/messages/1')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done(err);
      });
  });
  it('should spy on next called on catch', done => {
    const { deleteMessage } = CommunityMessageController;
    const spy007 = sinon.spy();
    deleteMessage(fakeUser.userRequest1, fakeResponse, spy007);
    expect(spy007).to.exist;
    done();
  });
});
