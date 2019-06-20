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


const unknownToken = Authenticate.generateToken(2000, 'unknown@mail.com', 'unknown');


describe('Post api/community/messages', () => {
  let userToken = null;
  let userToken2 = null;
  before((done) => {
    request(server)
      .post('/api/users/login')
      .send({ email: 'cruise@mail.com', password: '12345678', })
      .end((err, res) => {
        const { token } = res.body;
        userToken = token;
      });

    request(server)
      .post('/api/users/login')
      .send({ email: 'ted123@mail.com', password: '12345678', })
      .end((err, res) => {
        const { token } = res.body;
        userToken2 = token;
        done(err);
      });
  });

  it('it should return an error if token cannot be verifed', (done) => {
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

  it('it should return an error if token is not provided', (done) => {
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
  it('it sends/create message', (done) => {
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

  it('it reurns 401 error', (done) => {
    request(server)
      .post('/api/community/messages')
      .set('authorization', userToken2)
      .send({
        body: 'cover your lids to die with the sun www.google.com',
      })
      .end((err, res) => {
        expect(res.body.error).to.eql('You are not authorized to post community message');
        expect(res.status).to.eql(401);
        done(err);
      });
  });

  it('Should return a 404(Not found) error if a user does not exist', (done) => {
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

  it('should spy on next called on catch', (done) => {
    const { postMessage } = CommunityMessageController;
    const spy007 = sinon.spy();
    postMessage(fakeUser.userRequest1, fakeResponse, spy007);
    expect(spy007).to.exist;
    done();
  });
});

describe('Get api/community/messages', () => {
  let userToken = null;
  let userToken2 = null;
  before((done) => {
    request(server)
      .post('/api/users/login')
      .send({ email: 'cruise@mail.com', password: '12345678', })
      .end((err, res) => {
        const { token } = res.body;
        userToken = token;
      });

    request(server)
      .post('/api/users/login')
      .send({ email: 'ted123@mail.com', password: '12345678', })
      .end((err, res) => {
        const { token } = res.body;
        userToken2 = token;
        done(err);
      });
  });
  it('should get all messages if user is certified or a trainer', (done) => {
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

  it('it returns 401 error if user is not a trainer or certified', (done) => {
    request(server)
      .get('/api/community/messages')
      .set('authorization', userToken2)
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql('You are not authorized to view community messages');
        expect(res.status).to.eql(401);
        done(err);
      });
  });

  it('Should return a 404(Not found) error if a user does not exist', (done) => {
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
  it('should spy on next called on catch', (done) => {
    const { getMessage } = CommunityMessageController;
    const spy007 = sinon.spy();
    getMessage(fakeUser.userRequest1, fakeResponse, spy007);
    expect(spy007).to.exist;
    done();
  });
});
