import models from '../../models';

const { User, Message } = models;

/**
 * A class that handles messages methods
 */
class MessageController {
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

      const newMessage = await user.createSentMessage(message);
      return res.status(201).json({
        status: res.statusCode,
        message: newMessage.dataValues,
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * get all received messages
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   */
  static async getReceievedMessages(req, res, next) {
    const { userId } = req.user;

    try {
      const messages = await Message.findAll({ where: { receiverId: userId } });
      if (!messages.length) {
        return res.status(200).json({
          status: 200,
          message: 'no recieved messages',
        });
      }

      return res.status(200).json({
        status: 200,
        data: messages
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * get all sent messages
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   */
  static async getSentMessages(req, res, next) {
    const { userId } = req.user;

    try {
      const messages = await Message.findAll({ where: { senderId: userId } });
      if (!messages.length) {
        res.status(200).json({
          status: 200,
          message: 'no sent messages',
        });
      }
      return res.status(200).json({
        status: 200,
        data: messages
      });
    } catch (e) {
      next(e);
    }
  }
}

export default MessageController;
