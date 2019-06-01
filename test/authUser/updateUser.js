import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';

use(chaihttp);

describe('Post api/user', () => {
  it('it update\'s a registered user', (done) => {
    request(server)
      .put('/api/user/1')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.user).to.be.an('array');
        expect(res.body.user[0].firstName).to.eql('Ted');
        expect(res.body.user[0].userName).to.eql('MosTed');
        expect(res.body.user[0].email).to.eql('ted123@mail.com');
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
