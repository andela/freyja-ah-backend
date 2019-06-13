import { describe, it } from 'mocha';
import { request, expect } from 'chai';
import server from '../../index';

describe('GET /api/modules', () => {
  it('get all modules', (done) => {
    request(server)
      .get('/api/modules')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.be.an('object');
        done(err);
      });
  });
});
