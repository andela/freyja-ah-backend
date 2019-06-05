import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;

describe('2+2', () => {
  it('should return 4', (done) => {
    expect(2 + 2).to.eql(4);
    done();
  });
});
