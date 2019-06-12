import express from 'express';
import passport from 'passport';
import { userSocialMediaCallback } from '../../../controller/socialMediaController';

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  userSocialMediaCallback

);
export default router;
