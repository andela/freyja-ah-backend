import express from 'express';
import userController from '../../controller/users';
import userValidation from '../../middleware/validations/user';

const router = express.Router();

router.post('/users', userValidation, userController.resgisterUser);

router.post('/users/login', userController.login);

router.get('/user/:id', userController.getUser);

router.put('/user/:id', userController.updateUser);

router.get('/user/verify/:token', userController.verifyUser);

export default router;
