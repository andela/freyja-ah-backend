module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PrivateMessages', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false
    },
    senderId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    parentMessageId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('PrivateMessages')
};
