import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../index';
import Authenticate from '../middleware/auth/Authenticate';

use(chaihttp);
let userToken;
const unknownUserToken = Authenticate.generateToken(2000, 'unknown@mail.com', 'unknown');

describe('Testing Search routes - GET api/search/user', () => {
  before((done) => {
    const user = {
      firstName: 'unique',
      lastName: 'Dicaprio',
      userName: 'leonardo',
      email: 'leonardotwo@mail.com',
      password: '12345678',
      gender: 'male'
    };
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token;
        done(err);
      });
  });

  it('Should search for a user', (done) => {
    request(server)
      .get('/api/search/user/unique')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.results).to.be.an('array');
        expect(res.body.results[0].firstName).to.eql('unique');
        done(err);
      });
  });

  it('Should return status 404(Not found) when user does not exist', (done) => {
    request(server)
      .get('/api/search/user/unique')
      .set('authorization', unknownUserToken)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql(404);
        expect(res.body.error).to.eql('This user does not exist');
        done(err);
      });
  });

  it('Should return "no search results found" if search does not return any matches', (done) => {
    request(server)
      .get('/api/search/user/unknownuser')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('There are no results matching your search');
        done(err);
      });
  });

  it('Should search for content', (done) => {
    request(server)
      .get('/api/search/content/speech')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.results).to.be.an('array');
        expect(res.body.results[0].name).to.eql('speech');
        done(err);
      });
  });

  it('Should return "no search results found" if search does not return any matches', (done) => {
    request(server)
      .get('/api/search/content/unknowncontent')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('There are no results matching your search');
        done(err);
      });
  });
});
