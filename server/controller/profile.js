import models from '../models';

const { User, Profile } = models;
/**
 * A class that handles user profile operations
* */
class ProfileController {
  /**
   * create a profile
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async createProfile(req, res, next) {
    const { userId } = req.user;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist',
        });
      }

      const {
        age, gender, phoneNumber, isEmployed, bio, yrsOfExperience, industry, image,
        isEnrolled, progress, isCertified, instagram, twitter, facebook, linkedIn
      } = req.body;

      const [newProfile, created] = await Profile.findOrCreate({
        where: { userId },
        defaults: {
          age,
          phoneNumber,
          gender,
          userId,
          isEmployed,
          bio,
          yrsOfExperience,
          industry,
          image,
          isEnrolled,
          progress,
          isCertified,
          instagram,
          twitter,
          facebook,
          linkedIn
        }
      });

      if (!created) {
        return res.status(400).json({
          status: 400,
          error: 'This user already has a profile, please update profile instead',
        });
      }

      return res.status(201).json({
        status: res.statusCode,
        message: 'Profile was created successfully',
        profile: newProfile.dataValues,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: `There was an error creating your profile. ${e}`,
      });
    }
  }
}

export default ProfileController;
