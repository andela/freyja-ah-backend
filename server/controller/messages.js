import models from '../models';

const { Messages } = models;

/**
 * A class that handles messages methods
 */
class messageController {
  /**
   * get all received messages
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   */
  static async getAllReceievedMessages(req, res) {
    const { userId } = req.user;

    try {
      const messages = await Messages.findAll({ where: { receiverId: userId } });
      if (!messages) {
        res.status(200).json({
          status: 200,
          message: 'no recieved messages',
        });
      }
      return res.status(200).json({
        status: 200,
        data: messages
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * get all sent messages
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   */
  static async getAllSentMessages(req, res) {
    const { userId } = req.user;

    try {
      const messages = await Messages.findAll({ where: { senderId: userId } });
      if (!messages) {
        res.status(200).json({
          status: 200,
          message: 'no sent messages',
        });
      }
      return res.status(200).json({
        status: 200,
        data: messages
      });
    } catch (error) {
      return error;
    }
  }
}

export default messageController;
