const { body, validationResult } = require('express-validator/check');

const signUpValidator = [
  body('firstName')
    .isLength({ min: 3 })
    .withMessage('firstName should not be empty and should be more than three characters')
    .isAlpha()
    .withMessage('firstName should be an alpabet')
    .trim(),
  body('lastName')
    .isAlpha()
    .withMessage('lastName should be an alphabet')
    .isLength({ min: 3 })
    .withMessage('lastName should not be empty and should be more than three characters')
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
    .withMessage('password should not be empty and should be more than 8 characters'),
  function signUpValidation(req, res, next) {
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
export default signUpValidator;
