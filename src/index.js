'use strict';

let fastly = require('fastly-promises');
let services = require('./services');
let domains = require('./domains');

/**
 * Function to fetch all the services and domains for a particular Fastly account.
 *
 * @name anonymous
 * @function
 * @param token {String}
 * @return {Object} {
 *    domains            : list of all domains for a particular Fastly account
 *    number_of_domains  : number of domains for a particular Fastly account
 *    number_of_services : number of services for a particular Fastly account
 * }
 */
module.exports = async token => {
  try {
    const fastlyInstance = fastly(token, null);
    const serviceIDs = await services(fastlyInstance);
    const userDomains = await domains(fastlyInstance, serviceIDs);

    return userDomains;
  } catch (e) {
    return Promise.reject(new Error(e));
  }
};
