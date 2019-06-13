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
  };
  return Module;
};
