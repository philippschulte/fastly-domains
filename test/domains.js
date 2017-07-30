'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const domains = require('../src/domains');
const services = require('./response/services.response');
const response = require('./response/domains.response');

describe('domains.js', () => {
  describe('Valid request status 200', () => {
    let userDomains;

    nock(config.mainEntryPoint)
      .get(`/service/${services.body[0].id}/domain`)
      .reply(200, response.body.domains);

    before(async () => {
      userDomains = await domains('50a2213a73c8a8811f03f9fc6410335d', services.body);
    });

    it('should exist', () => {
      expect(userDomains).toExist();
    });

    it('should return an object', () => {
      expect(userDomains).toBeA('object');
    });

    it('should return a list of all domains', () => {
      expect(userDomains.domains.length).toBeGreaterThanOrEqualTo(2);
    });

    it('should have domains, number_of_domains, and number_of_services properties', () => {
      expect(userDomains).toIncludeKeys(['domains', 'number_of_domains', 'number_of_services']);
      expect(userDomains).toEqual(response.body);
    });
  });

  describe('Invalid request status 401', () => {
    let error;

    nock(config.mainEntryPoint)
      .get(`/service/${services.body[0].id}/domain`)
      .reply(401);

    before(async () => {
      try {
        await domains('invalid token', services.body);
      } catch (e) {
        error = response.error[401];
      }
    });

    it('should exist', () => {
      expect(error).toExist();
    });

    it('should return error message for status 401', () => {
      expect(error.msg).toBe(response.error[401].msg);
    });
  });

  describe('Invalid request status 404', () => {
    let error;

    nock(config.mainEntryPoint)
      .get('/service/60Esr3c2mP2IO4881htKVi/domain')
      .reply(404);

    before(async () => {
      try {
        await domains('50a2213a73c8a8811f03f9fc6410335d', [{
          version: 3,
          id: '60Esr3c2mP2IO4881htKVi'
        }]);
      } catch (e) {
        error = response.error[404];
      }
    });

    it('should exist', () => {
      expect(error).toExist();
    });

    it('should return error message for status 404', () => {
      expect(error.msg).toBe(response.error[404].msg);
    });
  });
});
