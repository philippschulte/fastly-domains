'use strict';

const map = require('lodash/fp/map');
const pick = require('lodash/fp/pick');

/**
 * Function to fetch all the services for a particular Fastly account.
 *
 * @name anonymous
 * @function
 * @param instance {Object}
 * @return {Array} [{
 *    version : the current version of this service
 *    id      : the alphanumeric string identifying a service
 * },]
 */
module.exports = async instance => {
  try {
    const services = await instance.serviceList();
    
    return map(pick(['version', 'id']))(services.data);
  } catch (e) {
    return Promise.reject(new Error(e.response.data.msg));
  }
};
