import express from 'express';
import userController from '../../controller/users';
import signUpValidation from '../../middleware/validations/signUp';
import signInValidation from '../../middleware/validations/signIn';
import tokenHandler from '../../middleware/auth/Authenticate';

const router = express.Router();

router.post('/users', signUpValidation, userController.registerUser);

router.post('/users/login', signInValidation, userController.login);

router.get('/user/:id', tokenHandler.verifyToken, userController.getUser);

router.put('/user/', tokenHandler.verifyToken, userController.updateUser);

router.get('/user/verify/:token', userController.verifyUser);

router.post('/users/reset', userController.resetPassword);
router.post('/users/change-password', userController.changePassword);
export default router;
