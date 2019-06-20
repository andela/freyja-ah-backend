import models from '../../models';
import { characterLengthCheck, linkCheck } from '../../utils/messageCheck';

const { User, CommunityMessage } = models;


/**
 * A class that handles user profile operations
* */
class CommunityMessageController {
  /**
     * post a message to the community
     * @param {object} req - request object
     * @param {object} res - response object
     * @param{function} next - next function
     * @returns {object} response object
     *
     */
  static async postMessage(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      const { body } = req.body;
      const isApproved = !(characterLengthCheck(body) || linkCheck(body));
      if (user) {
        const userProfile = await user.getProfile();
        if (user.role === 'trainer' || userProfile.isCertified) {
          const message = await CommunityMessage.create({
            body,
            senderId: userId,
            isApproved,
          });
          return res.status(202).json({
            status: res.statusCode,
            message: 'Message sent',
            communityMessage: message,
          });
        }
        return res.status(401).json({
          status: res.statusCode,
          error: 'You are not authorized to post community message'
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        error: 'user not found',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CommunityMessageController;
