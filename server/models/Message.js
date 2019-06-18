module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    parentMessageId: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});
  Messages.associate = (models) => {
    Messages.belongsTo(models.User, {
      foreignKey: 'senderId',
      as: 'sentMessages'
    });

    Messages.belongsTo(models.User, {
      foreignKey: 'receiverId',
      as: 'recievedMessages'
    });
  };
  return Messages;
};
