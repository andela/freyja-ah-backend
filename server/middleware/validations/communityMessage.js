import { check, validationResult } from 'express-validator/check';

const communityMessageValidator = {
  newCommunityMessageValidator: [
    check('body')
      .optional()
      .trim()
      .isString()
      .withMessage('message should be a string'),

    function communityMessageValidation(req, res, next) {
      const errorValidation = validationResult(req);
      if (!errorValidation.isEmpty()) {
        return res.status(422).json({
          status: 422,
          error: errorValidation.array()
        });
      }
      next();
    }
  ]

};
export default communityMessageValidator;
