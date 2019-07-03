import models from '../models';

const { User, CommunityMessage } = models;

/**
 * A class that handles reply methods
 */
class ReplyController {
  /**
   * Posts a reply
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async postReply(req, res, next) {
    try {
      const { userId } = req.user;
      const { body, repliedMsgId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist',
        });
      }
      const message = await CommunityMessage.findByPk(repliedMsgId);
      if (!message) {
        return res.status(404).json({
          status: 404,
          error: 'This message does not exist',
        });
      }
      const userProfile = await user.getProfile();
      if (!userProfile.dataValues.isCertified) {
        return res.status(401).json({
          status: 401,
          error: 'This user is not permitted to post a reply',
        });
      }

      const reply = {
        body,
        ownerId: userId,
        repliedMsgId,
      };
      const newReply = await user.createReply(reply);

      return res.status(201).json({
        status: res.statusCode,
        reply: {
          ...newReply.dataValues,
          owner: user
        }
      });
    } catch (e) {
      next(e);
    }
  }
}

export default ReplyController;
