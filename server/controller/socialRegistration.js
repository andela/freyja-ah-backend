import Authenticate from '../middleware/auth/Authenticate';
import models from '../models';

const { User } = models;
const socialSignOn = async (accessToken, refreshToken, profile, done) => {
  try {
    const {
      id, displayName, emails,
    } = profile;
    const [firstName, lastName] = displayName.split(' ');

    if (!emails) {
      const noEmailError = 'No email was found in your account';
      return done(null, noEmailError);
    }
    const email = emails[0].value;
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        password: id,
        email,
        isVerified: true,
      }
    });
    const token = Authenticate.generateToken(user.id, user.email, user.userName);
    user.isNewUser = created;
    user.token = token;
    return done(null, user);
  } catch (err) {
    return err;
  }
};

const newUserCheck = (req, res) => {
  const { isNewUser, token, noEmailError } = req.user;
  if (noEmailError) {
    return res.status(401).json({
      status: res.statusCode,
      message: noEmailError,
    });
  }
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

export { socialSignOn, newUserCheck };
