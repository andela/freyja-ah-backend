/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Messages',
    [
      {
        id: 1,
        senderId: '1',
        receiverId: '2',
        parentMessageId: '1',
        body: 'Hey man, how you doing today',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        senderId: '2',
        receiverId: '1',
        parentMessageId: '1',
        body: 'Hey man, i am good today',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {}
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Messages', null, {})
};
