import express from 'express';
import userController from '../../controller/test';
import testValidation from '../../middleware/validations/test';

const router = express.Router();

router.get('/tests/:moduleId', testValidation, userController.getTest);
export default router;
