import models from '../models';

const { Module } = models;

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
  static async getSpecificModule(req, res) {
    try {
      const newModule = await Module.findByPk(parseInt(req.params.id, 10), {
        include: [{ model: models.Content, as: 'contents' }]
      });
      if (!newModule) {
        return res.status(404).json({
          status: 404,
          error: 'module not found'
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'module returned successfully',
        data: newModule
      });
    } catch (error) {
      return error;
    }
  }
}
export default ModulesController;
