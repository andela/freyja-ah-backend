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
      {
        id: 3,
        senderId: '3',
        receiverId: '4',
        parentMessageId: '1',
        body: 'Hey man, i am good today',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        senderId: '4',
        receiverId: '3',
        parentMessageId: '1',
        body: 'Hey man, i am good today',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        senderId: '5',
        receiverId: '6',
        parentMessageId: '1',
        body: 'Hey man, i am good today',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        senderId: '6',
        receiverId: '5',
        parentMessageId: '1',
        body: 'Hey man, i am good today',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        senderId: '7',
        receiverId: '8',
        parentMessageId: '1',
        body: 'Hey man, i am good today',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        senderId: '8',
        receiverId: '7',
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
