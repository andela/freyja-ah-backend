import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import server from '../../index';

describe('GET /api/tests/:moduleId', () => {
  it('should return error when module Id is invalid', (done) => {
    request(server)
      .get('/api/tests/hjs')
      .end((err, res) => {
        expect(res.status).to.eql(422);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should return no found test if it does not find any test with the module id', (done) => {
    request(server)
      .get(`/api/tests/${99}`)
      .end((err, res) => {
        expect(res.status).to.eql(404);
        expect(res.body.status).to.eql('failed');
        expect(res.body.error).to.eql('No test for found for the specified module Id');
        done();
      });
  });
  it('should return the found test when module Id is correct', (done) => {
    request(server)
      .get(`/api/tests/${1}`)
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });
});
