import express from 'express';
import passport from 'passport';
import { userSocialMediaCallback } from '../../../controller/socialMediaController';

const router = express.Router();

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  userSocialMediaCallback,

);
export default router;
