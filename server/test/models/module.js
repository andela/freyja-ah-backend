import chai from 'chai';
import sinonChai from 'sinon-chai';
import {
  sequelize, dataTypes, checkModelName, checkPropertyExists
} from 'sequelize-test-helpers';

import ContentModel from '../../models/Contents';
import ModuleModel from '../../models/Module';

chai.use(sinonChai);
const { expect } = chai;

describe('test for content model', () => {
  const Content = ContentModel(sequelize, dataTypes);
  const Module = ModuleModel(sequelize, dataTypes);
  const content = new Content();

  checkModelName(Content)('Content');

  context('associations', () => {
    before(() => {
      Content.associate({ Module });
    });

    it('defined a belongsTo association with Module', () => {
      expect(Content.belongsTo).to.have.been.calledWith(Module);
    });
  });

  context('properties', () => {
    ['name', 'link'].forEach(checkPropertyExists(content));
  });
});
