import chai from 'chai';
import sinonChai from 'sinon-chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';

import TestModel from '../../models/Test';
import ModuleModel from '../../models/Module';
import QuestionModel from '../../models/Question';
import UserModel from '../../models/User';

chai.use(sinonChai);
const { expect } = chai;

describe('test for users model', () => {
  const Test = TestModel(sequelize, dataTypes);
  const Module = ModuleModel(sequelize, dataTypes);
  const Question = QuestionModel(sequelize, dataTypes);
  const User = UserModel(sequelize, dataTypes);
  const test = new Test();

  checkModelName(Test)('Test');

  context('associations', () => {
    before(() => {
      Test.associate({ Module });
      Test.associate({ Question });
      Test.associate({ User });
    });

    it('defined a belongsTo association with Module', () => {
      expect(Test.belongsTo).to.have.been.calledWith(Module);
    });
    it("defined a hasMany association with Question as 'questions'", () => {
      expect(Test.hasMany).to.have.been.calledWith(Question, {
        foreignKey: 'testId',
        as: 'questions',
      });
    });
    it("defined a belongsToMany association with User through UserTest'", () => {
      expect(Test.belongsToMany).to.have.been.calledWith(User, {
        through: 'UserTest',
        foreignKey: 'testId',
      });
    });
  });

  context('properties', () => {
    ['moduleId'].forEach(checkPropertyExists(test));
  });
});
