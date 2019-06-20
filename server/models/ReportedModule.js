module.exports = (sequelize, DataTypes) => {
  const ReportedModule = sequelize.define(
    'ReportedModule',
    {
      reason: DataTypes.STRING,
      comment: DataTypes.STRING,
      moduleId: DataTypes.INTEGER,
      reporterId: DataTypes.INTEGER
    },
    {}
  );
  ReportedModule.associate = (models) => {
    // associations can be defined here
  };
  return ReportedModule;
};
