import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';

use(chaihttp);

describe('Post api/user', () => {
  it('update a registered user', (done) => {
    request(server)
      .put('/api/user/1')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.firstName).to.eql('Ted');
        expect(res.body.user.email).to.eql('ted123@mail.com');
        done(err);
      });
  });

  it('it returns a Notfound Error if the user is not registered', (done) => {
    request(server)
      .put('/api/user/100')
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.message).to.eql('User does not exist');
        done(err);
      });
  });
});
