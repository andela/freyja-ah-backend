//import { LIMIT_DEFAULT } from '../constants';
/**
 * @param {object} query
 * @returns {object} - object containing limit and offset
 */
const paginate = (query) => {
  const limit = parseInt(query.limit, 10) || 10;
  const offset = limit - 1;
  return { limit, offset };
};

export default {
  paginate
};
