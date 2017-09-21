'use strict';

const expect = require('expect');
const rewire = require('rewire');
const index = rewire('../src/index');
const response = require('./response/domains.response');

describe('index.js', () => {
  const fastly = expect.createSpy();
  const services = expect.createSpy();
  const domains = expect.createSpy();

  index.__set__('fastly', fastly);
  index.__set__('services', services);
  index.__set__('domains', domains);
  
  describe('Valid function invocation', () => {
    let returnValue;
    
    before(async () => {
      domains.andReturn(response.domainList.body);
      returnValue = await index('923b6bd5266a7f932e41962755bd4254');
    });
    
    it('should call #fastly once', () => {
      expect(fastly.calls.length).toEqual(1);
    });
    
    it('should call #services once', () => {
      expect(services.calls.length).toEqual(1);
    });
    
    it('should call #domains once', () => {
      expect(domains.calls.length).toEqual(1);
    });

    it('should return all domains associated to the account', () => {
      expect(returnValue).toBe(response.domainList.body);
    });
  });
});
