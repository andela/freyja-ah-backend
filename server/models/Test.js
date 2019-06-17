module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define(
    'Test',
    {
      moduleId: DataTypes.INTEGER,
    },
    {},
  );
  Test.associate = (models) => {
    // associations can be defined here
    Test.belongsTo(models.Module, { foreignKey: 'moduleId', as: 'module' });
    Test.hasMany(models.Question, { foreignKey: 'testId', as: 'questions' });
    Test.belongsToMany(models.User, {
      through: 'UserTest',
      foreignKey: 'testId',
    });
  };
  return Test;
};
