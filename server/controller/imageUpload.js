import uploadImage from '../utils/cloudinary';
import models from '../models';

const { User } = models;
/**
 * A class that handles image upload
 */
class ImageUploader {
  /**
   * get all modules
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   */
  static async uploader(req, res, next) {
    const { userId } = req.user;
    try {
      // check if the user exists first
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'User does not exist'
        });
      }
      if (!req.file) {
        return res.status(422).json({
          status: 422,
          error: 'No image file was uploaded'
        });
      }
      const result = await uploadImage(req.file);
      ImageUploader.updateProfile(user, result.url);
      return res.status(200).json({
        status: 200,
        message: 'Image uploaded successfully',
        data: result.url
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * update the image in user profile
   * @param {object} user - request object
   * @param {object} imageUrl - request string
   * @returns {object} response object
   */
  static async updateProfile(user, imageUrl) {
    const userProfile = await user.getProfile();
    const updatedValue = { image: imageUrl };
    await userProfile.update(updatedValue);
  }
}

export default ImageUploader;
