import express from 'express';
import ProfileController from '../../controller/profile';
import profileValidator from '../../middleware/validations/profile';
import Authenticate from '../../middleware/auth/Authenticate';

const router = express.Router();
const { verifyToken } = Authenticate;
const { newProfileValidator } = profileValidator;
const { editProfile } = ProfileController;

router.put('/profiles', verifyToken, newProfileValidator, editProfile);

export default router;
