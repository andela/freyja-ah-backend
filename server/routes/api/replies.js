import express from 'express';
import replyValidator from '../../middleware/validations/replies';
import replyController from '../../controller/reply';
import Auth from '../../middleware/auth/Authenticate';

const { verifyToken } = Auth;
const { postReply } = replyController;

const router = express.Router();

router.post('/replies', verifyToken, replyValidator, postReply);

export default router;
