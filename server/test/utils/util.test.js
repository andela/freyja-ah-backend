import { describe, it } from 'mocha';
import { expect } from 'chai';
import { characterLengthCheck, linkCheck } from '../../utils/messageCheck';

describe('util functions test', () => {
  it('should test whether a link exits in the message body of a community message', (done) => {
    const messageBody = 'cover your eye lids to die with the sun';
    const result = linkCheck(messageBody);
    expect(result).to.be.a('boolean');
    expect(result).to.eql(false);
    const messageBody2 = 'cover your eye lids to die with the sun www.coldplay.com';
    const result2 = linkCheck(messageBody2);
    expect(result2).to.be.a('boolean');
    expect(result2).to.eql(true);
    done();
  });
  it('should check if the length of the message body is greater than 150', (done) => {
    const messageBody = 'cover your eye lids to die with the sun';
    const result = characterLengthCheck(messageBody);
    expect(result).to.be.a('boolean');
    expect(result).to.eql(false);
    const messageBody2 = `cover your eye lids to die with the sun 
    cover your eye lids to die with the sun 
    cover your eye lids to die with the sun
    cover your eye lids to die with the sun
    cover your eye lids to die with the sun`;
    const result2 = characterLengthCheck(messageBody2);
    expect(result2).to.be.a('boolean');
    expect(result2).to.eql(true);
    done();
  });
});
