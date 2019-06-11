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
      const Modules = await Module.findAll();
      return res.status(200).json({
        status: 200,
        data: Modules,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'internal server error',
      });
    }
  }
}
export default ModulesController;
