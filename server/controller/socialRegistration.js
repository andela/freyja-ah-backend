import dotenv from 'dotenv';
import Authenticate from '../middleware/auth/Authenticate';
import models from '../models';

dotenv.config();


const { FRONTEND_REDIRECT } = process.env;

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
  const { token, noEmailError } = req.user;
  if (noEmailError) {
    return res.status(401).json({
      status: res.statusCode,
      message: noEmailError,
    });
  }
  res.redirect(`${FRONTEND_REDIRECT}/signup?token=${token}`);
};

export { socialSignOn, newUserCheck };
