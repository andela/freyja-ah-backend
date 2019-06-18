module.exports = (sequelize, DataTypes) => {
  const PrivateMessage = sequelize.define('PrivateMessage', {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parentMessageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unread'
    }
  }, {
    timestamps: true,
    updatedAt: false
  });
  PrivateMessage.associate = (models) => {
    PrivateMessage.belongsTo(models.User, {
      foreignKey: 'receiverId',
      as: 'User',
    });
  };
  return PrivateMessage;
};
