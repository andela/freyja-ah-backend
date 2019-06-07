const { check, validationResult } = require('express-validator/check');

const profileValidator = {
  newProfileValidator: [
    check('age')
      .not().isEmpty()
      .withMessage('Age is required')
      .trim()
      .isNumeric()
      .withMessage('Enter a valid age'),
    check('gender')
      .not().isEmpty()
      .withMessage('Gender is required')
      .trim()
      .isIn(['male', 'Male', 'female', 'Female'])
      .withMessage('Enter a valid gender'),
    check('phoneNumber')
      .not().isEmpty()
      .withMessage('Phone number is required')
      .trim()
      .isNumeric()
      .withMessage('Enter a valid phone number')
      .isLength({ min: 11, max: 11 })
      .withMessage('Phone number must be 11 digits'),
    check('isEmployed')
      .not().isEmpty()
      .withMessage('Employment status is required')
      .trim()
      .isBoolean()
      .withMessage('Enter employment status'),
    check('yrsOfExperience')
      .not().isEmpty()
      .withMessage('Years of experience is required')
      .trim()
      .isNumeric()
      .withMessage('Invalid value'),
    check('bio')
      .not().isEmpty()
      .withMessage('Please enter a bio')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Tell us more about yourself'),
    check('industry')
      .optional()
      .isAlpha()
      .withMessage('Enter the industry you are currently employed in'),
    check('image')
      .optional()
      .isString()
      .withMessage('Enter a valid image format'),
    check('progress')
      .optional()
      .isNumeric()
      .withMessage('Progress must be a number'),
    check('isEnrolled')
      .optional()
      .isBoolean()
      .withMessage('isEnrolled should be true or false'),
    check('isCertified')
      .optional()
      .isBoolean()
      .withMessage('isCertified should be true or false'),
    check('instagram')
      .optional()
      .isURL()
      .withMessage('Invalid instagram url'),
    check('twitter')
      .optional()
      .isURL()
      .withMessage('Invalid twitter url'),
    check('facebook')
      .optional()
      .isURL()
      .withMessage('Invalid facebook url'),
    check('linkedIn')
      .optional()
      .isURL()
      .withMessage('Invalid linkedIn url'),

    function profileInputValidation(req, res, next) {
      const errorValidation = validationResult(req);
      if (!errorValidation.isEmpty()) {
        return res.status(422).json({
          status: 422,
          error: errorValidation.array()
        });
      }
      next();
    }
  ],
};
export default profileValidator;
