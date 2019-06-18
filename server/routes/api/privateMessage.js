import express from 'express';
import PrivateMessageController from '../../controller/privateMessage';
// import messageValidator from '../../middleware/validations/profile';
import Authenticate from '../../middleware/auth/Authenticate';

const router = express.Router();
const { verifyToken } = Authenticate;
const { sendMessage } = PrivateMessageController;

router.post('/privateMessages', verifyToken, sendMessage);

export default router;
