import express from 'express';
import moduleController from '../../controller/modules';
import Authenticate from '../../middleware/auth/Authenticate';
import validator from '../../middleware/validations/test';

const router = express.Router();

router.get(
  '/modules',
  Authenticate.verifyToken,
  moduleController.getAllModules,
);
router.get(
  '/modules/:id',
  Authenticate.verifyToken,
  moduleController.getModule
);
router.post(
  '/modules/report/:moduleId',
  Authenticate.verifyToken,
  validator.moduleIdValidator,
  moduleController.reportModule
);

export default router;
