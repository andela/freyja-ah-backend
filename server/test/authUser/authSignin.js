import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';

use(chaihttp);

describe('Post api/users/login', () => {
  it('login a user', (done) => {
    request(server)
      .post('/api/users/login')
      .send({
        email: 'ted123@mail.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('login was sucessful');
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.firstName).to.eql('Ted');
        expect(res.body.user.userName).to.eql('MosTed');
        expect(res.body.user.email).to.eql('ted123@mail.com');
        expect(res.body).to.have.a.property('token');
        done(err);
      });
  });

  it('it should return Unprocessable Entity Error if email is not provided', (done) => {
    request(server)
      .post('/api/users/login')
      .send({
        email: '',
        password: '123456',
      })
      .end((err, res) => {
        expect(res.body.errors.email).to.eql('please provide your email');
        expect(res.status).to.eql(422);
        done(err);
      });
  });

  it('it should return Unprocessable Entity Error if password is not provided', (done) => {
    request(server)
      .post('/api/users/login')
      .send({
        email: 'ted@mail.com',
        password: '',
      })
      .end((err, res) => {
        expect(res.body.errors.password).to.eql('please provide your password');
        expect(res.status).to.eql(422);
        done(err);
      });
  });

  it('it should return Unauthorized Error if user email is invalid', (done) => {
    request(server)
      .post('/api/users/login')
      .send({
        email: 'prince@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res.body.error).to.eql('Invalid email or password');
        expect(res.status).to.eql(401);
        done(err);
      });
  });
});
