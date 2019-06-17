module.exports = (sequelize, DataTypes) => {
  const UserTest = sequelize.define(
    'UserTest',
    {
      userId: DataTypes.INTEGER,
      testId: DataTypes.INTEGER,
    },
    {},
  );
  UserTest.associate = (models) => {
    // associations can be defined here
    UserTest.belongsTo(models.User, { foreignKey: 'userId' });
    UserTest.belongsTo(models.Test, { foreignKey: 'testId' });
  };
  return UserTest;
};
