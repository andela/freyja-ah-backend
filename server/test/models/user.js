import { expect } from 'chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkHookDefined,
  checkPropertyExists,
} from 'sequelize-test-helpers';

import User from '../../models/User';
import Profile from '../../models/Profile';
import CommunityMessage from '../../models/CommunityMessage';

describe('test for users model', () => {
  const userModel = User(sequelize, dataTypes);
  const user = new userModel();

  checkModelName(userModel)('User');

  context('properties', () => {
    [
      'firstName',
      'lastName',
      'email',
      'userName',
      'role',
      'encryptPassword',
      'comparePassword',
    ].forEach(checkPropertyExists(user));
  });
  context('hooks', () => {
    ['beforeCreate'].forEach(checkHookDefined(user));
  });
  context('Check the User Model associations', () => {
    before(() => {
      userModel.associate({
        Profile,
        CommunityMessage,
      });
    });
    it('It defined a belongsTo association with Profile', () => {
      expect(userModel.hasOne).to.have.been.calledWith(Profile);
    });
    it('It defined a belongsTo association with CommunityMessage', () => {
      expect(userModel.hasMany).to.have.been.calledWith(CommunityMessage);
    });
  });

  it('it should test for hashed password', (done) => {
    const userData = {
      firstName: 'Robin',
      lastName: 'Scherbatsky',
      email: 'scherbatsky@mail.com',
      userName: 'batsky',
      password: 'password1',
      age: 28,
    };
    const hashedPassword = user.encryptPassword(userData.password);
    expect(hashedPassword).to.be.a('string');
    expect(hashedPassword).to.not.eql(userData.password);
    userData.password = hashedPassword;
    expect(user.comparePassword('password1', userData)).to.eql(true);
    done();
  });
});
