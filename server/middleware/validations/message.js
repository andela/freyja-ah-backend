const { check, validationResult } = require('express-validator/check');

const messageValidator = [
  check('body')
    .not().isEmpty()
    .withMessage('Message body is required')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a message of at least one character in length'),
  check('receiverId')
    .not().isEmpty()
    .withMessage('Reciever Id is required')
    .trim()
    .isNumeric()
    .withMessage('Reciever Id must be a number'),
  check('parentMessageId')
    .optional()
    .trim()
    .isNumeric()
    .withMessage('Reciever Id must be a number'),

  function messageValidation(req, res, next) {
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

export default messageValidator;
