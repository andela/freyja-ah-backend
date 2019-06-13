import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from 'sequelize-test-helpers';
import Module from '../../models/module';

describe('test for modules model', () => {
  const moduleModel = Module(sequelize, dataTypes);
  const module = new moduleModel();
  checkModelName(moduleModel)('Module');
  context('properties', () => {
    ['name', 'description'].forEach(checkPropertyExists(module));
  });
});
