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
        password: '12345678'
      })
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('login was sucessful');
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.firstName).to.eql('Ted');
        expect(res.body.user.email).to.eql('ted123@mail.com');
        expect(res.body).to.have.a.property('token');
        done(err);
      });
  });
  it('should return error when password is incorrect', (done) => {
    request(server)
      .post('/api/users/login')
      .send({
        email: 'ted123@mail.com',
        password: 'wrongPassword'
      })
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.status).to.eql(res.status);
        expect(res.body.error).to.eql('Invalid email or password');
        done();
      });
  });
  it('should not login a user if input fields are empty', (done) => {
    request(server)
      .post('/api/users/login')
      .send({
        email: '',
        password: ''
      })
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.be.a('number');
        expect(res.body.status).to.eql(422);
        expect(res.body.error).to.be.an('array');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});
