'use strict';

const expect = require('expect');
const config = require('../src/config');

describe('config.js', () => {
  it('main entry point should exist', () => {
    expect(config.mainEntryPoint).toExist();
  });

  it('main entry point should be a string', () => {
    expect(config.mainEntryPoint).toBeA('string');
  });
});
