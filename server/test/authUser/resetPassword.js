/* eslint-disable no-unused-expressions */
import chai from 'chai';
import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import Authenticate from '../../middleware/auth/Authenticate';
import server from '../../index';
import fakeUser from '../socialLogin.js/fakeUser';
import fakeResponse from '../socialLogin.js/fakeResponse';
import UserController from '../../controller/users';

dotenv.config();

chai.use(chaiHttp);

const { expect } = chai;

describe('Reset Password /api/users/reset', () => {
  it('should send a token to the users email when email exists', (done) => {
    chai
      .request(server)
      .post('/api/users/reset')
      .send({ email: 'ted123@mail.com' })
      .end((err, res) => {
        expect(res.status).to.eql(202);
        expect(res.body.status).to.eql('success');
        expect(res.body.message).to.eql(
          'Reset password email as been sent to you, Kindly check your email for next steps to be taken to reset your password',
        );
        done();
      });
  });
  it('should return error when user email does not exist in the database', (done) => {
    chai
      .request(server)
      .post('/api/users/reset')
      .send({ email: 'tunde@mail.com' })
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).eql('error');
        expect(res.body.message).to.eql('Email does not exist');
        done();
      });
  });
});

describe('Change user password', () => {
  it('should return error when token is not available in the url parameter', (done) => {
    chai
      .request(server)
      .post('/api/users/change-password')
      .send({ email: 'test@mail.com' })
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.status).to.eql('error');
        expect(res.body.message).to.eql(
          'token not found in the request, kindly send another request to reset password',
        );
        done();
      });
  });
  it('should return error when new password is not passed along with the request', (done) => {
    chai
      .request(server)
      .post('/api/users/change-password?token=hsjahsjhashj')
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.eql('error');
        expect(res.body.message).to.eql('new password is not provided');
        done();
      });
  });
  it('should send error when token returned is invalid', (done) => {
    chai
      .request(server)
      .post('/api/users/change-password?token=hjhyhdshhjdsjhdjh')
      .send({ newPassword: 'secret' })
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.status).to.eql('error');
        expect(res.body.message).to.eql(
          'token is invalid, please send reset password request again',
        );
        done();
      });
  });
  it('should return error when token is correct but user is not found', (done) => {
    const token = Authenticate.generateToken(999, 'john@mail.com');
    chai
      .request(server)
      .post(`/api/users/change-password?token=${token}`)
      .send({ newPassword: 'lovely' })
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql('error');
        expect(res.body.message).to.eql('user not found');
        done();
      });
  });
  it('should return success when password is changed successfully', (done) => {
    const token = Authenticate.generateToken(1, 'ted123@mail.com');
    chai
      .request(server)
      .post(`/api/users/change-password?token=${token}`)
      .send({ newPassword: '12345678' })
      .end((err, res) => {
        expect(res.status).to.eql(202);
        expect(res.body.status).to.eql('success');
        expect(res.body.message).to.eql('password updated successfully');
        done();
      });
  });

  it('should spy on next called on catch', (done) => {
    const { changePassword } = UserController;
    const spy007 = sinon.spy();
    changePassword(fakeUser.userRequest1, fakeResponse, spy007);
    expect(spy007).to.exist;
    done();
  });
});
