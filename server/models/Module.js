module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Module',
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  Module.associate = (models) => {
    Module.hasMany(models.Test, { foreignKey: 'moduleId', as: 'tests' });
    Module.hasMany(models.Content, { foreignKey: 'moduleId', as: 'contents' });
  };
  return Module;
};
