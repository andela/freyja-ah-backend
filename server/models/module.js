module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps: false,
  });
  return Module;
};
