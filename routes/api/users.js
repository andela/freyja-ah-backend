import express from 'express';
import userController from '../../controller/users';

const router = express.Router();

router.get('/user/:id', userController.getUser);

router.put('/user/:id', userController.updateUser);

router.post('/users/login', userController.login);

router.post('/users', userController.resgisterUser);

export default router;
