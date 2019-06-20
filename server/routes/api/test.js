import express from 'express';
import userController from '../../controller/test';
import testValidation from '../../middleware/validations/test';
import Authenticate from '../../middleware/auth/Authenticate';

const router = express.Router();

router.get('/tests/:moduleId', testValidation.moduleIdValidator, userController.getTest);
router.post(
  '/tests/answer/:testId',
  testValidation.testIdvalidator,
  Authenticate.verifyToken,
  userController.postScore
);
export default router;
