import express from 'express';
import moduleController from '../../controller/modules';

const router = express.Router();

router.get('/modules', moduleController.getAllModules);
router.get('/modules/:id', moduleController.getSpecificModule);


export default router;
