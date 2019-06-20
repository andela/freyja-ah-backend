import express from 'express';
import messageValidator from '../../../middleware/validations/message';
import messageController from '../../../controller/message/messages';
import Auth from '../../../middleware/auth/Authenticate';

const { verifyToken } = Auth;
const {
  sendMessage,
  getReceievedMessages,
  getSentMessages,
  getMessage
} = messageController;

const router = express.Router();

router.post('/messages', verifyToken, messageValidator, sendMessage);
router.get('/messages/received', verifyToken, getReceievedMessages);
router.get('/messages/sent', verifyToken, getSentMessages);
router.get('/messages/:messageId', verifyToken, getMessage);

export default router;
