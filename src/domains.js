'use strict';

const flow = require('lodash/fp/flow');
const map = require('lodash/fp/map');
const flatten = require('lodash/fp/flatten');
const pick = require('lodash/fp/pick');

/**
 * Function to fetch all the domains for a particular Fastly account.
 *
 * @name anonymous
 * @function
 * @param instance {Object}
 * @param serviceIDs {Array}
 * @return {Object} {
 *    domains            : list of all domains for a particular Fastly account
 *    number_of_domains  : number of domains for a particular Fastly account
 *    number_of_services : number of services for a particular Fastly account
 * }
 */
module.exports = async (instance, serviceIDs) => {
  try {
    const servicePromises = map(service => {
      instance.service_id = service.id;
      return instance.domainList(service.version);
    })(serviceIDs);

    const services = await Promise.all(servicePromises);

    const domains = flow(
      map(domain => domain.data),
      flatten,
      map(pick(['version', 'name', 'service_id']))
    )(services);

    return {
      domains,
      number_of_domains: domains.length,
      number_of_services: services.length
    };
  } catch (e) {
    return Promise.reject(new Error(e.response.data.msg));
  }
};
