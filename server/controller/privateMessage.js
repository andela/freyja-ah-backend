import models from '../models';

const { User } = models;
/**
 * Handles private message operations
* */
class PrivateMessageController {
  /**
   * Sends a message
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async sendMessage(req, res, next) {
    try {
      const { userId } = req.user;
      const { body, receiverId, parentMessageId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist',
        });
      }
      const recipient = await User.findByPk(receiverId);
      if (!recipient) {
        return res.status(404).json({
          status: 404,
          error: 'The message recipient does not exist',
        });
      }

      const message = {
        body,
        senderId: userId,
        receiverId,
        parentMessageId: parentMessageId || 0
      };

      const newMessage = await user.createPrivateMessage(message);
      return res.status(201).json({
        status: res.statusCode,
        message: newMessage.dataValues,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default PrivateMessageController;
