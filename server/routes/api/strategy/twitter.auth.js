import express from 'express';
import passport from 'passport';
import { userSocialMediaCallback } from '../../../controller/socialMediaController';

const router = express.Router();

router.get(
  '/auth/twitter',
  passport.authenticate('twitter')
);

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  userSocialMediaCallback

);
export default router;
