/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { socialMediaCallback } from '../controller/socialMediaController';

dotenv.config();

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  API_URL,
} = process.env;

const facebookConfig = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${API_URL}/api/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'displayName', 'photos'],
};

const googleConfig = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${API_URL}/api/auth/google/callback`,
};

const facebookStrategy = new FacebookStrategy(
  facebookConfig,
  socialMediaCallback
);

const googleStrategy = new GoogleStrategy(
  googleConfig,
  socialMediaCallback
);

export { facebookStrategy, googleStrategy };
