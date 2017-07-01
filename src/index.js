const axios = require('axios');
const services = require('./services');
const domains = require('./domains');

module.exports = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject('Fastly-Domain expected Fastly-Key, received undefined');
    }

    services(token)
      .then(services => {
        return domains(token, services);
      })
      .then(domains => {
        resolve(domains);
      })
      .catch(err => {
        reject(err.message);
      });
  });
};
