module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Module',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      description: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  Module.associate = (models) => {
    // associations can be defined here
    Module.hasMany(models.Content, { foreignKey: 'moduleId', as: 'contents' });
  };
  return Module;
};
