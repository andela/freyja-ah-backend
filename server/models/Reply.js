module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repliedMsgId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CommunityMessage',
        key: 'id',
      }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      }
    }
  }, {
    timestamps: true,
    updatedAt: false
  });
  Reply.associate = (models) => {
    Reply.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'Owner',
    });
    Reply.belongsTo(models.Message, {
      foreignKey: 'repliedMsgId',
      as: 'Message',
    });
  };
  return Reply;
};
