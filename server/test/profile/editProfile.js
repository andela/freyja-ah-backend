import { describe, it } from 'mocha';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';
import Authenticate from '../../middleware/auth/Authenticate';

use(chaihttp);
let userToken;
const unknownToken = Authenticate.generateToken(2000, 'unknown@mail.com', 'unknown');
const profileUrl = '/api/profiles';

describe('Testing Editing A User\'s Profile - PUT api/profiles', () => {
  before((done) => {
    const user = {
      firstName: 'Tom',
      lastName: 'Cruise',
      userName: 'cruise',
      email: 'cruise@mail.com',
      password: '12345678',
      gender: 'male',
      role: 'trainer',
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
    dateOfBirth: '1996-02-22',
    phoneNumber: '08135834411',
    isEmployed: true,
    bio: 'A passionate customer relations specialist',
    username: 'johnny',
    yrsOfExperience: 3,
    industry: 'Marketing',
    isCertified: true,
    image: 'tedmosbyportrait.jpg',
    instagram: 'instagram.com/tedmosby',
    twitter: 'twitter.com/tedmosby',
    facebook: 'facebook.com/tedmosby',
    linkedIn: 'linkedin.com/tedmosby'
  };

  const profileWithUndefinedValues = Object.keys(newProfile).reduce((profile, property) => {
    profile[property] = undefined;
    return profile;
  }, {});

  it('Edits a User\'s Profile', (done) => {
    request(server)
      .put(profileUrl)
      .set('authorization', userToken)
      .send(newProfile)
      .end((err, res) => {
        expect(res.status).to.eql(202);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Profile was successfully edited');
        expect(res.body.profile).to.be.an('object');
        expect(res.body.profile).to.have.property('dateOfBirth');
        expect(res.body.profile).to.have.property('phoneNumber');
        expect(res.body.profile.phoneNumber).to.equal('08135834411');
        done(err);
      });
  });

  it('It should retain the data stored in the database if a particular property is undefined', (done) => {
    request(server)
      .put(profileUrl)
      .set('authorization', userToken)
      .send(profileWithUndefinedValues)
      .end((err, res) => {
        expect(res.status).to.eql(202);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Profile was successfully edited');
        expect(res.body.profile).to.be.an('object');
        expect(res.body.profile).to.have.property('dateOfBirth');
        expect(res.body.profile).to.have.property('phoneNumber');
        expect(res.body.profile.phoneNumber).to.equal('08135834411');
        done(err);
      });
  });

  it('Should return status 401(Unauthorized) when there is no Token Provided', (done) => {
    request(server)
      .put(profileUrl)
      .send(newProfile)
      .end((err, res) => {
        expect(res.status).to.eql(401);
        expect(res.body.status).to.eql(401);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.eql('No Authentication Token Provided');
        done(err);
      });
  });

  it('Should return status 404(Not found) if a user does not exist', (done) => {
    request(server)
      .put(profileUrl)
      .set('authorization', unknownToken)
      .send(newProfile)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.eql('This user does not exist');
        done(err);
      });
  });

  it('Should return 422(Unprocessable Entity) when a user enters invalid data', (done) => {
    const inCorrectProfile = Object.assign({}, newProfile, { dateOfBirth: '999' });
    request(server)
      .put(profileUrl)
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
