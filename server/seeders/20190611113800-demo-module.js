/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Modules',
    [
      {
        id: 1,
        name: 'Module 1',
        description: 'Articles'
      },
      {
        id: 2,
        name: 'Module 2',
        description: 'Speech recognition'
      },
      {
        id: 3,
        name: 'Module 3',
        description: 'Role play'
      }
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Modules', null, {})
};
