import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';

use(chaihttp);

describe('Post api/users', () => {
  it('it register\'s a user', (done) => {
    request(server)
      .post('/api/users')
      .send({
        firstName: 'Ted',
        lastName: 'Mosby',
        userName: 'MosTed',
        email: 'ted123@mail.com',
        password: '123456',
        confirmPassword: '123456',
        employed: 'yes',
        age: 25,
        industry: 'Entertainment',
      })
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body.user).to.be.an('array');
        expect(res.body.user[0].firstName).to.eql('Ted');
        expect(res.body.user[0].userName).to.eql('MosTed');
        expect(res.body.user[0].email).to.eql('ted123@mail.com');
        done(err);
      });
  });
});
