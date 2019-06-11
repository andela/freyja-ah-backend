module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps: false,
  });
  Module.associate = (models) => {
    // associations can be defined here
  };
  return Module;
};
