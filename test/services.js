'use strict';

const nock = require('nock');
const expect = require('expect');
const config = require('../src/config');
const services = require('../src/services');
const response = require('./response/services.response');

describe('services.js', () => {
  describe('Valid request status 200', () => {
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
      expect(userServices[0]).toIncludeKeys(['version', 'id']);
      expect(userServices[0]).toEqual(response.body[0]);
    });
  });

  describe('Invalid request status 401', () => {
    let error;

    nock(config.mainEntryPoint)
      .get('/service')
      .reply(401);

    before(async () => {
      try {
        await services('invalid token');
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
});
