import express from 'express';
import usersRoute from './users';

import modulesRoute from './modules';
import facebookAuthRoute from './strategy/facebook.auth';
import googleAuthRoute from './strategy/google.auth';
import twitterAuthRoute from './strategy/twitter.auth';
import profileRoute from './profiles';
import testRoute from './test';

const router = express.Router();
router.use('/', usersRoute);
router.use('/', profileRoute);
router.use('/', modulesRoute);
router.use('/', usersRoute);
router.use('/', facebookAuthRoute);
router.use('/', googleAuthRoute);
router.use('/', twitterAuthRoute);
router.use('/', testRoute);

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

  return next(err);
});

export default router;
