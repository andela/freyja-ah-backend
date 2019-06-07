import express from 'express';
import userController from '../../controller/users';

const router = express.Router();

router.post('/users', userController.resgisterUser);

router.post('/users/login', userController.login);

router.get('/user/:id', userController.getUser);

router.put('/user/:id', userController.updateUser);

router.get('/user/verify/:token', userController.verifyUser);

export default router;
