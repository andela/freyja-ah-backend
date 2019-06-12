/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { socialMediaCallback } from '../controller/socialMediaController';

dotenv.config();

const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  TWITTER_APP_KEY,
  TWITTER_APP_SECRET,
  API_URL,
} = process.env;

const facebookConfig = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${API_URL}/api/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'displayName'],
};

const googleConfig = {
  clientID: GOOGLE_APP_ID,
  clientSecret: GOOGLE_APP_SECRET,
  callbackURL: `${API_URL}/api/auth/google/callback`,
};

const twitterConfig = {
  consumerKey: TWITTER_APP_KEY,
  consumerSecret: TWITTER_APP_SECRET,
  callbackURL: `${API_URL}/api/auth/twitter/callback`,
  includeEmail: true
};

const facebookStrategy = new FacebookStrategy(
  facebookConfig,
  socialMediaCallback
);

const googleStrategy = new GoogleStrategy(
  googleConfig,
  socialMediaCallback
);

const twitterStrategy = new TwitterStrategy(
  twitterConfig,
  socialMediaCallback,
);

export { facebookStrategy, googleStrategy, twitterStrategy };
