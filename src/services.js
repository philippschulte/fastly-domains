const map = require('lodash/fp/map');
const pick = require('lodash/fp/pick');
const axios = require('axios');
const url = require('./config').mainEntryPoint;

module.exports = token => {
  return axios.get(`${url}/service`, { headers: { 'Fastly-Key': token } })
    .then(services => {
      return map(pick(['version', 'id']))(services.data);
    });
};
