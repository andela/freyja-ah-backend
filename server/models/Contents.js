module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    'Content',
    {
      name: DataTypes.STRING,
      link: DataTypes.STRING,
      moduleId: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );
  Content.associate = (models) => {
    // associations can be defined here
    Content.belongsTo(models.Module, { foreignKey: 'moduleId', as: 'module' });
  };
  return Content;
};
