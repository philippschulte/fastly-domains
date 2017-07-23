'use strict';

const map = require('lodash/fp/map');
const pick = require('lodash/fp/pick');
const axios = require('axios');
const config = require('./config');

module.exports = async token => {
  try {
    const services = await axios.get(`${config.mainEntryPoint}/service`, { headers: { 'Fastly-Key': token } });
    return map(pick(['version', 'id']))(services.data);
  } catch (e) {
    throw new Error(`Unable to get services that use ${token}.`);
  }
};
