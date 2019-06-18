import { Op as Operator } from 'sequelize';
import models from '../models';

const {
  Test, Question, UserTest, Profile
} = models;
/**
 * A class that handles test methods
 * */
class TestController {
  /**
   * get a test
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async getTest(req, res) {
    const { moduleId } = req.params;
    const test = await Test.findAll({
      where: { moduleId },
      include: [{ model: Question, as: 'questions' }]
    });
    if (!test[0]) {
      return res.status(404).json({
        status: 'failed',
        error: 'No test for found for the specified module Id'
      });
    }
    return res.status(200).json({
      status: 'success',
      data: test
    });
  }

  /**
   *post a score
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async postScore(req, res, next) {
    const { testId } = req.params;
    const { userId } = req.user;
    const { score } = req.body;
    try {
      const test = await Test.findByPk(testId);
      if (!test) {
        return res.status(404).json({
          status: 'failed',
          error: 'Test not found'
        });
      }
      if (score >= 70) {
        TestController.updateTestPassed(userId, testId);
      }
      const newUserTest = await UserTest.create({ userId, testId, score });
      return res.status(200).json({
        status: 'success',
        data: newUserTest
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   *update test passed
   * @param{integer} userId
   * @param{integer} testId
   * @param{function} next
   * @returns {object} response
   *
   */
  static async updateTestPassed(userId, testId, next) {
    try {
      const checkPassedTest = await UserTest.findAll({
        where: { testId, score: { [Operator.gte]: 69 } }
      });
      if (checkPassedTest.length < 1) {
        const userProfile = await Profile.findOne({ where: { userId } });
        await userProfile.update({ testPassed: userProfile.testPassed + 1 });
        if (userProfile.testPassed === 3) {
          await userProfile.update({ isCertified: true });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

export default TestController;
