import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';

use(chaihttp);
let userToken, userId;
const profileUrl = '/api/profiles';

describe('Testing getting a single profile - GET api/profiles/:userId', () => {
  before((done) => {
    const user = {
      firstName: 'Leonardo',
      lastName: 'Dicaprio',
      userName: 'leonardo',
      email: 'leonardo@mail.com',
      password: '12345678',
      gender: 'male'
    };
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token;
        userId = res.body.user.id;
        done(err);
      });
  });

  const newProfile = {
    dateOfBirth: '1933-01-10',
    phoneNumber: '08135834411',
    isEmployed: true,
    bio: 'A passionate customer relations specialist',
    yrsOfExperience: 3,
    industry: 'Marketing',
    image: 'tedmosbyportrait.jpg',
    instagram: 'instagram.com/tedmosby',
    twitter: 'twitter.com/tedmosby',
    facebook: 'facebook.com/tedmosby',
    linkedIn: 'linkedin.com/tedmosby'
  };
  before((done) => {
    request(server)
      .put(profileUrl)
      .set('authorization', userToken)
      .send(newProfile)
      .end(done);
  });

  it('Should get a single profile', (done) => {
    request(server)
      .get(`${profileUrl}/${userId}`)
      .set('authorization', userToken)
      .end((err, res) => {
        const { user } = res.body;
        expect(res.status).to.eql(200);
        expect(user).to.be.a('object');
        expect(user.firstName).to.eql('Leonardo');
        expect(user.Profile).to.be.an('object');
        expect(user.Profile).to.have.property('dateOfBirth');
        expect(user.Profile).to.have.property('phoneNumber');
        expect(user.Profile.phoneNumber).to.equal('08135834411');
        done(err);
      });
  });

  it('Should return a 500 error when userId in params is not a number', (done) => {
    request(server)
      .get(`${profileUrl}/userIdString`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.eql(500);
        expect(res.body.errors.message).to.include('invalid input syntax for integer');
        done(err);
      });
  });

  it('Should return status 401(Unauthorized) when there is no Token Provided', (done) => {
    request(server)
      .get(`${profileUrl}/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.status).to.eql(401);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.eql('No Authentication Token Provided');
        done(err);
      });
  });

  it('Should return status 404(Not found) when user does not exist', (done) => {
    request(server)
      .get(`${profileUrl}/2000`)
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.eql('This user does not exist');
        done(err);
      });
  });
});
