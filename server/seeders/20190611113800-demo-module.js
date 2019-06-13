/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Modules', [{
    name: 'Obj',
    description: 'A new obj',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Modules', null, {})
};
