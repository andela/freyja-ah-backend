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
    Module.hasOne(models.Test, { foreignKey: 'moduleId', as: 'test' });
    Module.hasMany(models.Content, { foreignKey: 'moduleId', as: 'contents' });
  };
  return Module;
};
