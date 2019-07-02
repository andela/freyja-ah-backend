import express from 'express';
import SearchController from '../../controller/search';
import Authenticate from '../../middleware/auth/Authenticate';
import searchValidator from '../../middleware/validations/search';

const router = express.Router();
const { verifyToken } = Authenticate;
const { findUser, findContent } = SearchController;

router.get('/search/user/:keywords', verifyToken, searchValidator, findUser);
router.get('/search/content/:keywords', verifyToken, searchValidator, findContent);

export default router;
