/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Modules',
    [
      {
        id: 1,
        name: 'Module 1',
        description: 'Getting Started'
      },
      {
        id: 2,
        name: 'Module 2',
        description: 'Customer Service Techniques'
      },
      {
        id: 3,
        name: 'Module 3',
        description: 'Service Touch Points & Delivery'
      },
      {
        id: 4,
        name: 'Module 4',
        description: 'Dealing with Different Customer Types'
      },
      {
        id: 5,
        name: 'Module 5',
        description: 'Complaint Handling'
      }
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Modules', null, {})
};
