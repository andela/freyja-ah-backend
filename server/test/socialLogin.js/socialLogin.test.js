import { describe, it } from 'mocha';
import {
  expect,
  use,
  should,
  request
} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import nock from 'nock';
import { socialSignOn, newUserCheck } from '../../controller/socialRegistration';
import server from '../../index';
import fakeUser from './fakeUser';
import fakeReponse from './fakeResponse';
import models from '../../models';
import { facebookStrategy, googleStrategy, twitterStrategy } from '../../socialMediaService/passport';

const { User } = models;
should();
use(sinonChai);

nock('https://www.facebook.com/')
  .filteringPath(() => '/api/auth/facebook')
  .get('/api/auth/facebook')
  .reply(200, 'connected to facebook');

nock('https://accounts.google.com')
  .filteringPath(() => '/')
  .get('/')
  .reply(200, 'connected to google');

describe('passport strategy', () => {
  it('should test for Strategies', (done) => {
    expect(facebookStrategy).to.be.an('object');
    expect(googleStrategy).to.be.an('object');
    expect(twitterStrategy).to.be.an('object');
    done();
  });
  it('should be a function', (done) => {
    expect(socialSignOn).to.be.a('function');
    expect(newUserCheck).to.be.a('function');
    done();
  });
  it('should return user request object when  login is successful', (done) => {
    const user = newUserCheck(fakeUser.userRequest1, fakeReponse);
    expect(user).to.be.an('object').that.has.property('token');
    expect(user).to.be.an('object').that.has.property('message');
    expect(user.message).to.eql('Login was successful');
    done();
  });

  it('should return user request object when registration is successful', (done) => {
    const user = newUserCheck(fakeUser.userRequest2, fakeReponse);
    expect(user).to.be.an('object').that.has.property('token');
    expect(user).to.be.an('object').that.has.property('message');
    expect(user.message).to.eql('User resgistration was successful');
    done();
  });
  it('should call facebook route', async () => {
    const response = await request(server).get('/api/auth/facebook');
    expect(response).to.have.status(200);
    expect(response.text).to.be.deep.equal('connected to facebook');
  });

  it('should call google route', async () => {
    const response = await request(server).get('/api/auth/google');
    expect(response).to.have.status(200);
    expect(response.text).to.be.deep.equal('connected to google');
  });

  context('socialAuthentication Test', async () => {
    const accessToken = '';
    const refreshToken = '';
    const profile = {
      id: '999887634',
      emails: [{ value: 'barney@mail.com' }],
      name: {
        familyName: 'Stinson',
        givenName: 'Barney'
      }
    };

    const done = sinon.stub();

    const stub = sinon.spy(User, 'findOrCreate');
    const result = await socialSignOn(accessToken, refreshToken, profile, done);
    expect(stub).to.have.been.calledWith({
      defaults: {
        email: 'barney@mail.com',
        firstName: 'Barney',
        isVerified: true,
        lastName: 'Stinson',
        password: '999887634'
      },
      where: { email: 'barney@mail.com' }
    });
    expect(result).to.be.an('object');
    expect(result.user).to.be.an('object');
    const isCreated = result.created;
    result.user.isNewUser = isCreated;
    expect(result.user.isNewUser).to.be.a('boolean');
    expect(result.user.isNewUser).to.be.a('true');

    stub.restore();
  });
});
