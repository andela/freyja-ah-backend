import express from 'express';
import communityMessageValidation from '../../../middleware/validations/communityMessage';
import Authenticate from '../../../middleware/auth/Authenticate';
import CommunityMessageController from '../../../controller/message/communityMessage';

const router = express.Router();
const { verifyToken } = Authenticate;
const { postMessage, getMessages, deleteMessage } = CommunityMessageController;
const { newCommunityMessageValidator } = communityMessageValidation;


router.post('/community/messages', verifyToken, newCommunityMessageValidator, postMessage);
router.get('/community/messages', verifyToken, getMessages);
router.delete('/community/messages/:id', verifyToken, deleteMessage);
export default router;
