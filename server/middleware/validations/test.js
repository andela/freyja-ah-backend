const { param, validationResult } = require('express-validator/check');

const moduleIdValidator = [
  param('moduleId', 'Invalid module id').isNumeric(),

  function testValidation(req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: errorValidation.array()[0].msg
      });
    }
    next();
  }
];
const testIdvalidator = [
  param('testId', 'Invalid test Id').isNumeric(),

  function testValidation(req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: errorValidation.array()[0].msg
      });
    }
    next();
  }
];
module.exports = {
  moduleIdValidator,
  testIdvalidator
};
