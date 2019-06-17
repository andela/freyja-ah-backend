module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      question: DataTypes.STRING,
      testId: DataTypes.INTEGER,
      options: DataTypes.ARRAY(DataTypes.STRING),
      answer: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  Question.associate = (models) => {
    // associations can be defined here
    Question.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
  };
  return Question;
};
