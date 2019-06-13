import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';

use(chaihttp);
let userToken;
const profileUrl = '/api/profiles';

describe('Testing Creating Profile - POST api/profiles', () => {
  before((done) => {
    const user = {
      firstName: 'Tom',
      lastName: 'Cruise',
      userName: 'cruise',
      email: 'cruise@mail.com',
      password: '12345678',
      confirmPassword: '12345678'
    };
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        userToken = res.body.token;
        done(err);
      });
  });

  const newProfile = {
    age: 28,
    gender: 'male',
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

  it('Creates a User Profile', (done) => {
    request(server)
      .post(profileUrl)
      .set('authorization', userToken)
      .send(newProfile)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Profile was created successfully');
        expect(res.body.profile).to.be.an('object');
        expect(res.body.profile).to.have.property('age');
        expect(res.body.profile).to.have.property('phoneNumber');
        done(err);
      });
  });

  it('Should return status 401(Unauthorized) when there is no Token Provided', (done) => {
    request(server)
      .post(profileUrl)
      .send(newProfile)
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.status).to.eql(401);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.eql('No Authentication Token Provided');
        done(err);
      });
  });

  it('Should return status 400(Bad request) when user already has a profile', (done) => {
    request(server)
      .post(profileUrl)
      .set('authorization', userToken)
      .send(newProfile)
      .end((err, res) => {
        expect(res.status).to.eql(400);
        expect(res.body.status).to.eql(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.eql('This user already has a profile, please update profile instead');
        done(err);
      });
  });

  it('Should return 422(Unprocessable Entity) when a user omits required fields', (done) => {
    const inCorrectProfile = Object.assign({}, newProfile, { gender: '' });

    request(server)
      .post(profileUrl)
      .set('authorization', userToken)
      .send(inCorrectProfile)
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.eql(422);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.an('array');
        done(err);
      });
  });
});
