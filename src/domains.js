'use strict';

const flow = require('lodash/fp/flow');
const map = require('lodash/fp/map');
const flatten = require('lodash/fp/flatten');
const pick = require('lodash/fp/pick');
const axios = require('axios');
const config = require('./config');

module.exports = async (token, serviceIDs) => {
  try {
    const servicePromises = map(service => {
      return axios.get(
        `${config.mainEntryPoint}/service/${service.id}/domain`,
        { headers: { 'Fastly-Key': token } }
      );
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
    return Promise.reject(new Error(e));
  }
};
