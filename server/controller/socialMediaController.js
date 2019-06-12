/* eslint-disable import/prefer-default-export */
import Authenticate from '../middleware/auth/Authenticate';
import models from '../models';

const { User } = models;
const socialMediaCallback = (accessToken, refreshToken, profile, done) => {
  try {
    const {
      id, displayName, emails,
    } = profile;

    if (!emails) {
      const noEmailError = 'No email was found in your account';
      return done(null, noEmailError);
    }

    const email = emails[0].value;
    const names = displayName.split(' ');
    User.findOrCreate({
      where: { email },
      defaults: {
        firstName: names[0],
        lastName: names[1],
        password: id,
        email,
        isVerified: true,
      }
    }).then(([user, created]) => {
    //   console.log(user);
    //   console.log(`this is ${created}`);
      const token = Authenticate.generateToken(user.id, user.email, user.userName);
      user.isNewUser = created;
      user.token = token;
      return done(null, user);
    });
    // }).then((user, created) => {
    //   const token = Authenticate.generateToken(user.id, user.email, user.userName);
    //   user.isNewUser = created;
    //   user.token = token;
    //   done(null, user);
    // });
    // return done(null, user);
  } catch (err) {
    return err;
  }
};

const userSocialMediaCallback = (req, res) => {
  const { isNewUser, token } = req.user;
  if (isNewUser) {
    return res.status(201).json({
      status: res.statusCode,
      message: 'User resgistration was successful',
      token,
    });
  }

  return res.status(200).json({
    status: res.statusCode,
    message: 'Login was successful',
    token,
  });
};

export { socialMediaCallback, userSocialMediaCallback };
