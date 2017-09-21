'use strict';

const nock = require('nock');
const expect = require('expect');
const fastly = require('fastly-promises');
const services = require('../src/services');
const response = require('./response/services.response');

describe('services.js', () => {
  describe('Valid function invocation', () => {
    const fastlyInstance = fastly('923b6bd5266a7f932e41962755bd4254', null);
    let res;
    
    nock('https://api.fastly.com')
      .get('/service')
      .reply(200, response.serviceList.body);
    
    before(async () => {
      res = await services(fastlyInstance);
    });
    
    it('return value should exist', () => {
      expect(res).toExist();
    });
    
    it('return value should be an array', () => {
      expect(Array.isArray(res)).toBe(true);
    });
    
    it('return value should be an array of objects', () => {
      res.forEach(item => {
        expect(item).toBeA('object');
      });
    });
    
    it('return value items should have id and version properties', () => {
      res.forEach(item => {
        expect(item).toIncludeKeys(['id', 'version']);
      });
    });
  });

  describe('Invalid function invocation - no or invalid token', () => {
    const fastlyInstance = fastly();
    let error;

    nock('https://api.fastly.com')
      .get('/service')
      .reply(401);

    before(async () => {
      try {
        await services(fastlyInstance);
      } catch (e) {
        error = response.serviceList.error[401];
      }
    });

    it('return value should exist', () => {
      expect(error).toExist();
    });

    it('return value should be an string', () => {
      expect(error).toBeA('string');
    });

    it('return value should be the error message for status 401', () => {
      expect(error).toBe(response.serviceList.error[401]);
    });
  });
});
