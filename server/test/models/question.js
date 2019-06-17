import chai from 'chai';
import sinonChai from 'sinon-chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';

import TestModel from '../../models/Test';
import QuestionModel from '../../models/Question';

chai.use(sinonChai);
const { expect } = chai;

describe('test for question model', () => {
  const Test = TestModel(sequelize, dataTypes);
  const Question = QuestionModel(sequelize, dataTypes);
  const question = new Question();

  checkModelName(Question)('Question');

  context('associations', () => {
    before(() => {
      Question.associate({ Test });
    });

    it('defined a belongsTo association with Test', () => {
      expect(Question.belongsTo).to.have.been.calledWith(Test);
    });
  });

  context('properties', () => {
    ['question', 'options', 'answer'].forEach(checkPropertyExists(question));
  });
});
