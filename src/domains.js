const flow = require('lodash/fp/flow');
const map = require('lodash/fp/map');
const flatten = require('lodash/fp/flatten');
const pick = require('lodash/fp/pick');
const axios = require('axios');
const url = require('./config').mainEntryPoint;

module.exports = (token, services) => {
  const fastlyServices = map(service => {
    return axios.get(`${url}/service/${service.id}/domain`, { headers: { 'Fastly-Key': token } });
  })(services);

  return Promise.all(fastlyServices)
    .then(services => {
      const domains = flow(
        map(domain => domain.data),
        flatten,
        map(pick(['version', 'name', 'service_id']))
      )(services);

      return {
        domains,
        number_of_domains: domains.length,
        number_of_services: fastlyServices.length
      };
    });
};
