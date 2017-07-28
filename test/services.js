'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const services = require('../src/services');
const response = require('./response/services.response');

describe('services.js', () => {
  describe('Valid request', () => {
    let userServices;

    nock(config.mainEntryPoint)
      .get('/service')
      .reply(200, response.body);

    before(async () => {
      userServices = await services('50a2213a73c8a8811f03f9fc6410335d');
    });

    it('should exist', () => {
      expect(userServices).toExist();
    });

    it('should return an array', () => {
      expect(Array.isArray(userServices)).toBe(true);
    });

    it('should return an array of objects', () => {
      expect(userServices[0]).toBeA('object');
    });

    it('should have version and id properties', () => {
      expect(userServices[0]).toIncludeKeys([ 'version', 'id' ]);
    });
  });

  describe('Provided credentials are missing or invalid', () => {
    let error;

    nock(config.mainEntryPoint)
      .get('/service')
      .reply(401, response.error[401]);

    before(async () => {
      try {
        await services('invalid token');
      } catch (e) {
        error = e;
      }
    });

    it('should exist', () => {
      expect(error).toExist();
    });

    it('should return error message', () => {
      expect(error.message).toBe(response.error[401].message);
    });
  });
});
