'use strict';

const nock = require('nock');
const expect = require('expect');
const fastly = require('fastly-promises');
const domains = require('../src/domains');
const services = require('./response/services.response');
const response = require('./response/domains.response');

describe('domains.js', () => {
  describe('Valid function invocation', () => {
    const fastlyInstance = fastly('923b6bd5266a7f932e41962755bd4254', null);
    let res;
    
    nock('https://api.fastly.com')
      .get('/service/20Esr3c2mP2IO4661htKVo/version/2/domain')
      .reply(200, response.domainList.body);
    
    before(async () => {
      res = await domains(fastlyInstance, services.serviceList.body);
    });
    
    it('return value should exist', () => {
      expect(res).toExist();
    });
    
    it('return value should be an object', () => {
      expect(res).toBeA('object');
    });
    
    it('return value should have domains, number_of_domains, and number_of_services properties', () => {
      expect(res).toIncludeKeys(['domains', 'number_of_domains', 'number_of_services']);
    });
  });

  describe('Invalid function invocation - no or invalid token', () => {
    const fastlyInstance = fastly(null, null);
    let error;

    nock('https://api.fastly.com')
      .get('/service/20Esr3c2mP2IO4661htKVo/version/2/domain')
      .reply(401);

    before(async () => {
      try {
        await domains(fastlyInstance, services.serviceList.body);
      } catch (e) {
        error = response.domainList.error[401];
      }
    });

    it('return value should exist', () => {
      expect(error).toExist();
    });

    it('return value should be an string', () => {
      expect(error).toBeA('string');
    });

    it('return value should be the error message for status 401', () => {
      expect(error).toBe(response.domainList.error[401]);
    });
  });

  describe('Invalid function invocation - invalid service_id', () => {
    const fastlyInstance = fastly('923b6bd5266a7f932e41962755bd4254', null);
    let error;

    nock('https://api.fastly.com')
      .get('/service/invalid_service_id/version/2/domain')
      .reply(404);

    before(async () => {
      try {
        await domains(fastlyInstance, [{
          version: 2,
          id: 'invalid_service_id'
        }]);
      } catch (e) {
        error = response.domainList.error[404];
      }
    });

    it('return value should exist', () => {
      expect(error).toExist();
    });

    it('return value should be an string', () => {
      expect(error).toBeA('string');
    });

    it('return value should be the error message for status 404', () => {
      expect(error).toBe(response.domainList.error[404]);
    });
  });
});
