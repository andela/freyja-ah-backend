import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import server from '../../index';

describe('GET /api/modules', () => {
  it('should get all modules', (done) => {
    request(server)
      .get('/api/modules/1')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.contents).to.be.an('array');
        done(err);
      });
  });
  it('should not get all modules if module is not found', (done) => {
    request(server)
      .get('/api/modules/8')
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.be.a('number');
        expect(res.body.error).to.be.an('string');
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done(err);
      });
  });
});
