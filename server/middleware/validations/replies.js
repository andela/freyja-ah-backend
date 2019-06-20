const { check, validationResult } = require('express-validator/check');

const replyValidator = [
  check('body')
    .not().isEmpty()
    .withMessage('Reply body is required')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Enter a reply of at least one character in length'),
  check('repliedMsgId')
    .not().isEmpty()
    .withMessage('Replied Message Id is required')
    .trim()
    .isNumeric()
    .withMessage('Replied Message Id must be a number'),

  function replyValidation(req, res, next) {
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

export default replyValidator;
