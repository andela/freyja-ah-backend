import express from 'express';
import usersRoute from './users';
import modulesRoute from './modules';
import facebookAuthRoute from './strategy/facebook.auth';
import googleAuthRoute from './strategy/google.auth';
import twitterAuthRoute from './strategy/twitter.auth';
import profileRoute from './profiles';
import testRoute from './test';
import messageRoute from './messages/messages';
import communityMessageRoute from './messages/communityMessage';
import repliesRoute from './replies';
import imageRoute from './upload';

const router = express.Router();
router.use('/', usersRoute);
router.use('/', profileRoute);
router.use('/', modulesRoute);
router.use('/', facebookAuthRoute);
router.use('/', googleAuthRoute);
router.use('/', twitterAuthRoute);
router.use('/', testRoute);
router.use('/', messageRoute);
router.use('/', communityMessageRoute);
router.use('/', repliesRoute);
router.use('/', imageRoute);

export default router;
