module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Messages', {
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    parentMessageId: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});
  Message.associate = (models) => {
    Message.belongsTo(models.User, {
      foreignKey: 'senderId',
      as: 'sentMessages'
    });

    Message.belongsTo(models.User, {
      foreignKey: 'receiverId',
      as: 'recievedMessages'
    });
  };
  return Message;
};
