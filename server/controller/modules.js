import models from '../models';

const { Module, ReportedModule } = models;

/**
 * A class that handles modules methods
 */
class ModulesController {
  /**
   * get all modules
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   */
  static async getAllModules(req, res) {
    try {
      const modules = await Module.findAll();
      return res.status(200).json({
        status: 200,
        data: modules
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * get all modules
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   */
  static async getModule(req, res) {
    try {
      const module = await Module.findByPk(parseInt(req.params.id, 10), {
        include: [{ model: models.Content, as: 'contents' }]
      });
      if (!module) {
        return res.status(404).json({
          status: 404,
          error: 'module not found'
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'module returned successfully',
        data: module
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * Report a module
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   */
  static async reportModule(req, res, next) {
    const { reason, comment } = req.body;
    const { userId } = req.user;
    const { moduleId } = req.params;
    try {
      const module = await Module.findByPk(moduleId);
      if (!module) {
        return res.status(404).json({
          status: 404,
          error: 'Module not found'
        });
      }
      const reported = await ReportedModule.create({
        reason,
        comment,
        reporterId: userId,
        moduleId
      });
      return res.status(200).json({
        data: {
          reported,
          message: 'Module was reported successfully'
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
export default ModulesController;
