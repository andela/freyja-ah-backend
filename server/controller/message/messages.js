
import sendGridMailer from '@sendgrid/mail';
import dotenv from 'dotenv';
import models from '../../models';
import paginationUtil from '../../utils/pagination';

dotenv.config();
sendGridMailer.setApiKey(process.env.SENDGRID_API_KEY);

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
      const { userId, email } = req.user;
      const { body, receiverId, parentMessageId } = req.body;

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist'
        });
      }
      const recipient = await User.findByPk(receiverId);
      if (!recipient) {
        return res.status(404).json({
          status: 404,
          error: 'The message recipient does not exist'
        });
      }

      const message = {
        body,
        senderId: userId,
        receiverId,
        parentMessageId: parentMessageId || 0
      };

      const newMessage = await user.createSentMessage(message);
      if (newMessage.dataValues) {
        const msg = {
          to: recipient.dataValues.email,
          from: 'CSLC@gmail.com',
          subject: 'New Message',
          html: `You have a new message from ${email} `,
        };
        await sendGridMailer.send(msg);
      }

      return res.status(201).json({
        status: res.statusCode,
        message: newMessage.dataValues
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
    const { returnLimit, pageNumber } = req.query;
    const { limit, offset } = paginationUtil.paginate(returnLimit, pageNumber);
    const { userId } = req.user;

    try {
      const messages = await Message.findAll(
        {
          where: { receiverId: userId },
          limit,
          offset,
          order: [
            ['createdAt', 'DESC']
          ]
        }
      );
      if (!messages.length) {
        return res.status(200).json({
          status: 200,
          message: 'no recieved messages'
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
    const { returnLimit, pageNumber } = req.query;
    const { limit, offset } = paginationUtil.paginate(returnLimit, pageNumber);
    const { userId } = req.user;

    try {
      const messages = await Message.findAll(
        {
          where: { senderId: userId },
          limit,
          offset,
          order: [
            ['createdAt', 'DESC']
          ]
        }
      );
      if (!messages.length) {
        res.status(200).json({
          status: 200,
          message: 'no sent messages'
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
  static async getMessage(req, res, next) {
    const { userId } = req.user;
    const { messageId } = req.params;
    let message;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist'
        });
      }

      const sentMessage = await Message.findOne({
        where: { senderId: userId, id: messageId }
      });

      const receivedMessage = await Message.findOne({
        where: { receiverId: userId, id: messageId }
      });

      if (!sentMessage && !receivedMessage) {
        return res.status(404).json({
          status: 404,
          message: 'no messages'
        });
      }

      if (receivedMessage) {
        await Message.update({ status: 'read' }, { where: { id: messageId } });
      }
      if (sentMessage) {
        message = sentMessage.dataValues;
      } else {
        message = receivedMessage.dataValues;
      }
      return res.status(200).json({
        status: 200,
        data: message
      });
    } catch (e) {
      next(e);
    }
  }
}

export default MessageController;
