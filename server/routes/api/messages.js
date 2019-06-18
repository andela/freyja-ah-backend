import express from 'express';
import messageController from '../../controller/messages';
import Auth from '../../middleware/auth/Authenticate';

const { verifyToken } = Auth;

const router = express.Router();

router.get('/messages/received', verifyToken, messageController.getAllReceievedMessages);
router.get('/messages/sent', verifyToken, messageController.getAllSentMessages);


export default router;
