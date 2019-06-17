import models from '../models';

const { Test, Question } = models;
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
}

export default TestController;
