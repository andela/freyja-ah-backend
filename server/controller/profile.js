import models from '../models';

const { User, Profile } = models;
/**
 * A class that handles user profile operations
* */
class ProfileController {
  /**
   * edits a profile
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async editProfile(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist',
        });
      }
      const userProfile = await user.getProfile();
      const {
        dateOfBirth, phoneNumber, isEmployed, bio, yrsOfExperience, industry, image,
        isEnrolled, progress, isCertified, instagram, twitter, facebook, linkedIn
      } = req.body;

      const updatedValues = {
        userId: userProfile.userId,
        dateOfBirth: dateOfBirth || userProfile.dateOfBirth,
        phoneNumber: phoneNumber || userProfile.phoneNumber,
        isEmployed: isEmployed || userProfile.isEmployed,
        bio: bio || userProfile.bio,
        industry: industry || userProfile.industry,
        yrsOfExperience: yrsOfExperience || userProfile.yrsOfExperience,
        image: image || userProfile.image,
        isEnrolled: isEnrolled || userProfile.isEnrolled,
        progress: progress || userProfile.progress,
        isCertified: isCertified || userProfile.isCertified,
        instagram: instagram || userProfile.instagram,
        twitter: twitter || userProfile.twitter,
        facebook: facebook || userProfile.facebook,
        linkedIn: linkedIn || userProfile.linkedIn
      };

      const updatedProfile = await userProfile.update(updatedValues).catch(next);
      return res.status(202).json({
        status: res.statusCode,
        message: 'Profile was successfully edited',
        profile: Object.assign({}, user.dataValues, updatedProfile.dataValues)
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * get a user's profile
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async getProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.params.userId, {
        include: [{ model: Profile, as: 'profile' }]
      });

      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist',
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        user: user.dataValues
      });
    } catch (e) {
      next(e);
    }
  }
}

export default ProfileController;
