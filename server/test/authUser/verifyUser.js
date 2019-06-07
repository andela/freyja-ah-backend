import { describe, it } from 'mocha';
import faker from 'faker';
import dotenv from 'dotenv';
import sendGridMailer from '@sendgrid/mail';
import { use, request, expect } from 'chai';
import chaihttp from 'chai-http';
import server from '../../index';


dotenv.config();
sendGridMailer.setApiKey(process.env.SENDGRID_API_KEY);
use(chaihttp);
let recieverToken;

describe('GET /api/user/verify', () => {
  before((done) => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'december',
      confirmPassword: 'december',
      userName: 'beejay',
    };
    request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        recieverToken = res.body.token;
        done();
      });
  });
  it('verify a registered user', (done) => {
    request(server)
      .get(`/api/user/verify/${recieverToken}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.message).to.eql('user has been verified');
        done(err);
      });
  });
});

describe('SEND mail with sendgrid', () => {
  it('should send mail', (done) => {
    const msg = {
      to: 'mattimobolaji@gmail.com',
      from: 'CSLC@gmail.com',
      subject: 'Welcome',
      html: `<strong>Welcome to Customer Service Learning Community <h3> copy and paste this link below in your browser to verify your account<h3/></strong> ${process.env.HOST}/api/user/verify/${recieverToken} `,
    };
    sendGridMailer.send(msg, (err) => {
      expect(err).to.eql(null);
      done();
    });
  });
});
