'use strict';

const expect = require('expect');
const config = require('../src/config');

describe('config.js', () => {
  describe('Main Entry Point', () => {
    it('main entry point should exist', () => {
      expect(config.mainEntryPoint).toExist();
    });

    it('main entry point should be a string', () => {
      expect(config.mainEntryPoint).toBeA('string');
    });
  });

  describe('Token', () => {
    it('token should exist', () => {
      expect(config.token).toExist();
    });

    it('token should be a string', () => {
      expect(config.token).toBeA('string');
    });
  });
});
