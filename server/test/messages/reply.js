import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';
import Authenticate from '../../middleware/auth/Authenticate';

use(chaihttp);
let firstUserToken, secondUserToken, thirdUserToken, communityMessageId, reply, profileUpdate;
const unknownUserToken = Authenticate.generateToken(2000, 'unknown@mail.com', 'unknown');
const replyUrl = '/api/replies';

describe('Testing posting a reply to a community message - POST api/replies', () => {
  before((done) => {
    const firstUser = {
      firstName: 'Morgan',
      lastName: 'Smith',
      userName: 'smithyy',
      email: 'smithy@mail.com',
      password: '12345678',
      gender: 'male'
    };

    const secondUser = Object.assign({}, firstUser, {
      firstName: 'Forest',
      userName: 'whitty',
      email: 'whitty@mail.com',
    });

    const thirdUser = Object.assign({}, firstUser, {
      userName: 'frosty',
      email: 'whittyforest@mail.com',
    });

    profileUpdate = {
      isCertified: true
    };

    const communityMessage = {
      body: 'Hello guys, my name is Morgan Smith',
    };

    request(server)
      .post('/api/users')
      .send(secondUser)
      .end((err, res) => {
        secondUserToken = res.body.token;
        request(server)
          .put('/api/profiles')
          .set('authorization', secondUserToken)
          .send(profileUpdate)
          .end();
      });

    request(server)
      .post('/api/users')
      .send(thirdUser)
      .end((err, res) => {
        thirdUserToken = res.body.token;
      });

    request(server)
      .post('/api/users')
      .send(firstUser)
      .end((err, res) => {
        firstUserToken = res.body.token;

        request(server)
          .put('/api/profiles')
          .set('authorization', firstUserToken)
          .send(profileUpdate)
          .end(() => {
            request(server)
              .post('/api/community/messages')
              .set('authorization', firstUserToken)
              .send(communityMessage)
              .end((err, res) => {
                communityMessageId = res.body.communityMessage.id;
                done(err);
              });
          });
      });
  });

  it('Posts a reply', (done) => {
    reply = {
      body: 'Nice to meet you Morgan',
      repliedMsgId: communityMessageId
    };
    request(server)
      .post(replyUrl)
      .set('authorization', secondUserToken)
      .send(reply)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.reply.body).to.equal('Nice to meet you Morgan');
        expect(res.body.reply).to.have.property('owner');
        expect(res.body.reply.owner.firstName).to.equal('Forest');
        done(err);
      });
  });

  it('It should return 404(not found) if the user posting the reply does not exist', (done) => {
    request(server)
      .post(replyUrl)
      .set('authorization', unknownUserToken)
      .send(reply)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.error).to.eql('This user does not exist');
        done(err);
      });
  });

  it('It should return 404(not found) if message doesnt exist', (done) => {
    const invalidReply = Object.assign({}, reply, {
      repliedMsgId: 4000
    });

    request(server)
      .post(replyUrl)
      .set('authorization', firstUserToken)
      .send(invalidReply)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.error).to.eql('This message does not exist');
        done(err);
      });
  });

  it('It should not allow an uncertified user post a reply', (done) => {
    request(server)
      .post(replyUrl)
      .set('authorization', thirdUserToken)
      .send(reply)
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.error).to.eql('This user is not permitted to post a reply');
        done(err);
      });
  });

  it('Should return 422(Unprocessable Entity) when a user enters invalid data', (done) => {
    const invalidReply = Object.assign({}, reply, {
      body: ''
    });

    request(server)
      .post(replyUrl)
      .set('authorization', firstUserToken)
      .send(invalidReply)
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.eql(422);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.an('array');
        done(err);
      });
  });
});
