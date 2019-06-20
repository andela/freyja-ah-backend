const CommunityMessageModel = (sequelize, DataTypes) => {
  const CommunityMessage = sequelize.define('CommunityMessage', {
    body: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parentMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'userId',
      },
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }, {});
  CommunityMessage.associate = (models) => {
    CommunityMessage.belongsTo(models.User, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });
    CommunityMessage.hasMany(models.Reply, {
      foreignKey: 'repliedMsgId',
      as: 'replies',
    });
  };
  return CommunityMessage;
};
export default CommunityMessageModel;
