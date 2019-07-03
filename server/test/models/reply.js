import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';
import User from '../../models/User';
import CommunityMessage from '../../models/CommunityMessage';
import Reply from '../../models/Reply';

use(sinonChai);
describe('Testing the Reply model', () => {
  const replyModel = Reply(sequelize, dataTypes);
  const reply = new replyModel();

  checkModelName(replyModel)('Reply');

  context('properties', () => {
    [
      'body',
      'ownerId',
      'repliedMsgId',
    ].forEach(checkPropertyExists(reply));
  });

  context('check associations', () => {
    before(() => {
      replyModel.associate({ User });
      replyModel.associate({ CommunityMessage });
    });

    it('It defined a belongsTo association with User', () => {
      expect(replyModel.belongsTo).to.have.been.calledWith(User);
      expect(replyModel.belongsTo).to.have.been.calledWith(CommunityMessage);
    });
  });
});
