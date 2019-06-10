const { body, validationResult } = require('express-validator/check');

const validator = [
  body('firstName')
    .isLength({ min: 3 })
    .withMessage(
      'firstName should not be empty, should be more than one and less than 50 character'
    )
    .isAlphanumeric()
    .withMessage('firstName should be alpanumeric')

    .trim(),
  body('lastName')
    .isAlphanumeric()
    .withMessage('lastName should be alpanumeric')
    .isLength({ min: 3 })
    .withMessage(
      'lastName should not be empty, should be more than one and less than 50 character'
    )
    .trim(),
  body('email')
    .isEmail()
    .withMessage('email should not be empty and should be a valid email')
    .normalizeEmail(),
  body('password')
    .trim()
    .isAlphanumeric()
    .withMessage('password should be alpanumeric')
    .isLength({ min: 8 })
    .withMessage(
      'password should not be empty, should be more than 8 characters'
    ),

  function userInputValidation(req, res, next) {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: errorValidation.array()
      });
    }
    next();
  }
];
export default validator;
