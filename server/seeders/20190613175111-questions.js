/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Questions',
    [
      {
        question: 'How are you',
        options: ['fine', 'not fine'],
        answer: 'fine',
        testId: 1
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Questions', null, {})
};
