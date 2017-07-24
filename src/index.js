'use strict';

let services = require('./services');
let domains = require('./domains');

module.exports = async token => {
  const serviceIDs = await services(token);
  const userDomains = await domains(token, serviceIDs);
  return userDomains;
};
