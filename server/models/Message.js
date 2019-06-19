module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parentMessageId: DataTypes.INTEGER,
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
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
