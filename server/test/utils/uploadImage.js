import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import Authenticate from '../../middleware/auth/Authenticate';

chai.use(chaiHttp);

const { expect } = chai;
let userToken;
const userToken2 = Authenticate.generateToken(90, 'nouser@mail.com', 'noUser');
describe('Upload Image', () => {
  before((done) => {
    const mockUser = {
      email: 'ted123@mail.com',
      password: '12345678'
    };
    chai
      .request(server)
      .post('/api/users/login')
      .send(mockUser)
      .end((err, res) => {
        userToken = res.body.token;
        done();
      });
  });

  it('should return error when no image exist', (done) => {
    chai
      .request(server)
      .post('/api/image')
      .set('Authorization', userToken)
      .field('Content-Type', 'multipart/form-data')
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body.status).to.eql(422);
        expect(res.body.error).to.eql('No image file was uploaded');
        done();
      });
  });
  it('should return error when an invalid user sends a request to upload image', (done) => {
    chai
      .request(server)
      .post('/api/image')
      .set('Authorization', userToken2)
      .field('Content-Type', 'multipart/form-data')
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql(404);
        expect(res.body.error).to.eql('User does not exist');
        done();
      });
  });
});
