'use strict';

const expect = require('expect');
const config = require('../src/config');

describe('config.js', () => {
  it('should exist', () => {
    expect(config.mainEntryPoint).toExist();
  });

  it('should be a string', () => {
    expect(config.mainEntryPoint).toBeA('string');
  });
});
