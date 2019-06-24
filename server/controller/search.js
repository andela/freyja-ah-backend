/* eslint-disable quotes */
import models from '../models';

const { User } = models;
/**
 * A class that handles user search
* */
class SearchController {
  /**
   * searches for a user
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async findUser(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist',
        });
      }

      const keywordsArray = req.params.keywords.split(' ');
      const queryExtension = SearchController.generateQueryString('Users', ['firstName', 'lastName', 'userName'], keywordsArray);
      const query = `SELECT id, "Users"."firstName", "Users"."lastName", "Users"."userName", "Users"."email" FROM "Users" WHERE (${queryExtension})`;

      const results = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT
      });

      if (!results.length) {
        return res.status(200).json({
          status: res.statusCode,
          message: 'There are no results matching your search'
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        results
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * searches for specific content
   * @param {object} req - request object
   * @param {object} res - response object
   * @param{function} next - next function
   * @returns {object} response object
   *
   */
  static async findContent(req, res, next) {
    try {
      const { userId } = req.user;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          status: 404,
          error: 'This user does not exist',
        });
      }

      const keywords = req.params.keywords.split(' ');
      const queryExtension = SearchController.generateQueryString('Contents', ['name', 'description'], keywords);
      const query = `SELECT id, "Contents"."name", "Contents"."description", "Contents"."link" FROM "Contents" WHERE (${queryExtension})`;

      const results = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT
      });

      if (!results.length) {
        return res.status(200).json({
          status: res.statusCode,
          message: 'There are no results matching your search'
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        results
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * generates a query string
   * @param {string} tableName - Table to be searched
   * @param {array} columns - an array of columns to search on table above
   * @param {array} keywords - an array of keywords to search the table
   * @returns {string} generated query string
   *
   */
  static generateQueryString(tableName, columns, keywords) {
    if (!Array.isArray(columns) || !Array.isArray(keywords)) {
      throw new Error('columns and keywords must be arrays');
    }

    let query = '';
    columns.forEach((column, columnIdx) => {
      keywords.forEach((keyword, keywordIdx) => {
        const lastIteration = columnIdx === columns.length - 1 && keywordIdx === keywords.length - 1;
        query += `"${tableName}"."${column}" ILIKE '%${keyword.trim()}%' ${lastIteration ? '' : 'OR '}`;
      });
    });
    return query;
  }
}

export default SearchController;
