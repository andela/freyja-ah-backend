import models from '../../models';
import { characterLengthCheck, linkCheck } from '../../utils/messageCheck';
import paginationUtil from '../../utils/pagination';

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

  /**
     * gets all community messages
     * @param {object} req - request object
     * @param {object} res - response object
     * @param{function} next - next function
     * @returns {object} response object
     *
     */
  static async getMessage(req, res, next) {
    const { returnLimit, pageNumber } = req.query;
    const { limit, offset } = paginationUtil.paginate(returnLimit, pageNumber);
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'user not found',
        });
      }
      const communityMessages = await CommunityMessage.findAll(
        {
          where: { isApproved: true },
          limit,
          offset,
          order: [
            ['createdAt', 'DESC']
          ]
        }
      ).catch(next);
      const userProfile = await user.getProfile();
      const authorizedUser = userProfile.isCertified || user.role === 'trainer';
      if (!authorizedUser) {
        return res.status(401).json({
          status: res.statusCode,
          error: 'You are not authorized to view community messages'
        });
      }
      if (communityMessages.length) {
        return res.status(200).json({
          status: res.statusCode,
          message: 'messages returned successfully',
          data: communityMessages,
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        message: 'no community message was found',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * gets all community messages
     * @param {object} req - request object
     * @param {object} res - response object
     * @param{function} next - next function
     * @returns {object} response object
   */
  static async deleteMessage(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      const { id } = req.params;
      if (!user) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'user not found',
        });
      }
      const message = await CommunityMessage.findAll({
        attributes: ['senderId'],
        where: {
          id,
        }
      });
      if (!message.length) {
        return res.status(404).json({
          status: res.statusCode,
          error: 'message not found',
        });
      }
      const { senderId } = message[0];
      if (user.role === 'trainer' || (senderId === userId)) {
        await CommunityMessage.destroy({
          where: {
            id
          }
        });
        return res.status(200).json({
          status: res.statusCode,
          message: 'Message deleted succesfully',
        });
      } return res.status(401).json({
        status: res.statusCode,
        message: 'You are not authorized to delete this community message',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default CommunityMessageController;
