'use strict';

module.exports.domainList = {
  body: {
    domains: [
      {
        version: 2,
        name: 'fastly-domains.com',
        service_id: '20Esr3c2mP2IO4661htKVo'
      },
      {
        version: 2,
        name: 'www.fastly-domains.com',
        service_id: '20Esr3c2mP2IO4661htKVo'
      }
    ],
    number_of_domains: 2,
    number_of_services: 1
  },
  error: {
    401: 'Provided credentials are missing or invalid',
    404: 'Record not found'
  }
};
