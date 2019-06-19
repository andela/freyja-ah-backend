import express from 'express';
import communityMessageValidation from '../../../middleware/validations/communityMessage';
import Authenticate from '../../../middleware/auth/Authenticate';
import CommunityMessageController from '../../../controller/message/communityMessage';

const router = express.Router();
const { verifyToken } = Authenticate;
const { postMessage } = CommunityMessageController;
const { newCommunityMessageValidator } = communityMessageValidation;


router.post('/community/messages', verifyToken, newCommunityMessageValidator, postMessage);
export default router;
