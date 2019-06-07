import express from 'express';
import ProfileController from '../../controller/profile';
import profileValidator from '../../middleware/validations/profile';
import Authenticate from '../../middleware/auth/Authenticate';

const router = express.Router();
const { verifyToken } = Authenticate;
const { newProfileValidator } = profileValidator;
const { createProfile } = ProfileController;

router.post('/profiles', verifyToken, newProfileValidator, createProfile);

export default router;
