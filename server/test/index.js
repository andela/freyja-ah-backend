import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../index';

use(chaihttp);
const unknownUrl = '/api/unknown';

describe('Testing ErrorHandlers/Middlewares', () => {
  it('Should return a 404(Not found) when a WRONG URL is requested', (done) => {
    request(server)
      .get(unknownUrl)
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.body.errors.message).to.equal('Not Found');
        expect(res.body.errors.error).to.be.a('object');
        expect(res.body.errors.error.status).to.equal(404);
        done(err);
      });
  });

  it('Should return an error if verifyToken middleware is passed an invalid Token', (done) => {
    request(server)
      .get('/api/profiles/14')
      .set('authorization', 'invalidtokenstring')
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.eql(500);
        expect(res.body.status).to.eql(500);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.include('JsonWebTokenError: jwt malformed');
        done(err);
      });
  });
});
