/* eslint-disable no-unused-vars */
const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    confirmPassword: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    employed: DataTypes.STRING,
    industry: DataTypes.STRING
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
export default user;
