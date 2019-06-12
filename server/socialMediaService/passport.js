/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { socialMediaCallback } from '../controller/socialMediaController';

dotenv.config();

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  API_URL,
} = process.env;

const facebookConfig = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${API_URL}/api/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'displayName', 'photos'],
};

const facebookStrategy = new FacebookStrategy(
  facebookConfig,
  socialMediaCallback
);

export { facebookStrategy };
