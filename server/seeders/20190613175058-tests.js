/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Tests',
    [
      {
        moduleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        moduleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        moduleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        moduleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        moduleId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Tests', null, {})
};
