import models from '../models';

const { Message } = models;

/**
 * A class that handles messages methods
 */
class MessageController {
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
