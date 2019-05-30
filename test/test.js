import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
chai.use(chaiHttp);

describe('2+2', () => {
 it('should return 4', (done) => {
    expect(2+2).to.eql(4);
    done();
 })
})