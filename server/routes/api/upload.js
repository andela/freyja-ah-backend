import express from 'express';
import multer from 'multer';
import imageController from '../../controller/imageUpload';
import Authenticate from '../../middleware/auth/Authenticate';

const upload = multer();
const { verifyToken } = Authenticate;

const router = express.Router();

router.post('/image', verifyToken, upload.single('image'), imageController.uploader);

export default router;
