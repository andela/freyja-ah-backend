/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { socialSignOn } from '../controller/socialRegistration';

dotenv.config();


const {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  TWITTER_APP_KEY,
  TWITTER_APP_SECRET,
  DEV_HOST,
  PROD_HOST,
} = process.env;

let host = DEV_HOST;

if (process.env.NODE_ENV === 'production') {
  host = PROD_HOST;
}
const baseUrl = host;

const facebookConfig = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: `${baseUrl}/api/auth/facebook/callback`,
  profileFields: ['id', 'emails', 'displayName'],
};

const googleConfig = {
  clientID: GOOGLE_APP_ID,
  clientSecret: GOOGLE_APP_SECRET,
  callbackURL: `${baseUrl}/api/auth/google/callback`,
};

const twitterConfig = {
  consumerKey: TWITTER_APP_KEY,
  consumerSecret: TWITTER_APP_SECRET,
  callbackURL: `${baseUrl}/api/auth/twitter/callback`,
  includeEmail: true
};

const facebookStrategy = new FacebookStrategy(
  facebookConfig,
  socialSignOn
);

const googleStrategy = new GoogleStrategy(
  googleConfig,
  socialSignOn
);

const twitterStrategy = new TwitterStrategy(
  twitterConfig,
  socialSignOn,
);

export { facebookStrategy, googleStrategy, twitterStrategy };
