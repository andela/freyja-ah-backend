/**
 * @param {string} limit - limit for return
 * @param {string} pageNumber - number of page
 * @returns {object} - returns object of limits and pageNumber
 */
const paginate = (limit, pageNumber) => {
  pageNumber = parseInt(pageNumber, 10) || 1;
  limit = parseInt(limit, 10) || 20;
  const offset = limit * (pageNumber - 1);
  return { limit, offset };
};

export default {
  paginate
};
