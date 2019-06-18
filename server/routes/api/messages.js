import express from 'express';
import messageValidator from '../../middleware/validations/message';
import messageController from '../../controller/messages';
import Auth from '../../middleware/auth/Authenticate';

const { verifyToken } = Auth;
const { sendMessage, getReceievedMessages, getSentMessages } = messageController;

const router = express.Router();

router.post('/messages', verifyToken, messageValidator, sendMessage);
router.get('/messages/received', verifyToken, getReceievedMessages);
router.get('/messages/sent', verifyToken, getSentMessages);

export default router;
