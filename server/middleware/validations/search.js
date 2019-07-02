const { param, validationResult } = require('express-validator/check');

const searchValidator = [
  param('keywords')
    .not().isEmpty()
    .withMessage('Search keyword is required')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Keyword must be at least 3 characters in length'),

  function searchInputValidation(req, res, next) {
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

export default searchValidator;
