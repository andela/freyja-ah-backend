import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';
import User from '../../models/User';
import Message from '../../models/Message';

use(sinonChai);
describe('Testing the Message model', () => {
  const messageModel = Message(sequelize, dataTypes);
  const message = new messageModel();

  checkModelName(messageModel)('Message');

  context('properties', () => {
    [
      'body',
      'senderId',
      'receiverId',
      'status',
      'parentMessageId',
    ].forEach(checkPropertyExists(message));
  });

  context('check associations', () => {
    before(() => {
      messageModel.associate({ User });
    });

    it('It defined a belongsTo association with User', () => {
      expect(messageModel.belongsTo).to.have.been.calledWith(User);
    });
  });
});
