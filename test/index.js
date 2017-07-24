'use strict';

const expect = require('expect');
const rewire = require('rewire');
const config = require('../src/config');

describe('index.js', () => {
  const index = rewire('../src/index');
  const services = expect.createSpy();
  const domains = expect.createSpy();

  index.__set__('services', services);
  index.__set__('domains', domains);

  before(async () => {
    await index(config.token);
  });

  describe('#services', () => {
    it('should call services', () => {
      expect(services).toHaveBeenCalled();
    });

    it('should call services once', () => {
      expect(services.calls.length).toEqual(1);
    });
  });

  describe('#domains', () => {
    it('should call domains', () => {
      expect(domains).toHaveBeenCalled();
    });

    it('should call domains once', () => {
      expect(domains.calls.length).toEqual(1);
    });
  });
});
