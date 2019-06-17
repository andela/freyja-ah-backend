import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';

use(chaihttp);

describe('Post api/users', () => {
  const user = {
    firstName: 'Ted',
    lastName: 'Mosby',
    userName: 'tedmosby',
    email: 'ted123@mail.com',
    password: '12345678',
    gender: 'male'
  };

  it('register a user', (done) => {
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.message).to.eql('user registration was successful');
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.firstName).to.eql('Ted');
        expect(res.body.user.email).to.eql('ted123@mail.com');
        expect(res.body).to.have.a.property('token');
        done(err);
      });
  });

  it('should return 400(Bad Request) if user already exists', (done) => {
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('This user already exists');
        done(err);
      });
  });
  it('should not register a user if input fields are empty', (done) => {
    request(server)
      .post('/api/users')
      .send({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
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
