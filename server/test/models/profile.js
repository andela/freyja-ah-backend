import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';
import User from '../../models/User';
import Profile from '../../models/Profile';

use(sinonChai);
describe('Testing the Profile model', () => {
  const profileModel = Profile(sequelize, dataTypes);
  const profile = new profileModel();

  checkModelName(profileModel)('Profile');

  context('properties', () => {
    [
      'dateOfBirth',
      'phoneNumber',
      'isEmployed',
      'yrsOfExperience',
      'bio',
      'isEnrolled',
      'industry',
      'image',
      'progress',
      'isCertified',
      'instagram',
      'facebook',
      'twitter',
      'gender',
      'linkedIn'
    ].forEach(checkPropertyExists(profile));
  });

  context('check associations', () => {
    before(() => {
      profileModel.associate({ User });
    });

    it('It defined a belongsTo association with User', () => {
      expect(profileModel.belongsTo).to.have.been.calledWith(User);
    });
  });
});
