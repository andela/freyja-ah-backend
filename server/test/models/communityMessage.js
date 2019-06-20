import { expect } from 'chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';

import CommunityMessage from '../../models/CommunityMessage';
import User from '../../models/User';

describe('test for CommunityMessage model', () => {
  const CommunityMessageModel = CommunityMessage(sequelize, dataTypes);
  const communityMessage = new CommunityMessageModel();

  checkModelName(CommunityMessageModel)('CommunityMessage');

  context('properties', () => {
    [
      'body',
      'parentMessageId',
      'isApproved',
    ].forEach(checkPropertyExists(communityMessage));
  });
  context('check associations', () => {
    before(() => {
      CommunityMessageModel.associate({ User });
    });

    it('It defined a belongsTo association with User', () => {
      expect(CommunityMessageModel.belongsTo).to.have.been.calledWith(User);
    });
  });
});
