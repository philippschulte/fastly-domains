'use strict';

const expect = require('expect');
const rewire = require('rewire');

describe('index.js', () => {
  const index = rewire('../src/index');
  const fastly = expect.createSpy();
  const services = expect.createSpy();
  const domains = expect.createSpy();

  index.__set__('fastly', fastly);
  index.__set__('services', services);
  index.__set__('domains', domains);

  before(async () => {
    await index('923b6bd5266a7f932e41962755bd4254');
  });

  it('should call #fastly', () => {
    expect(fastly).toHaveBeenCalled();
  });
  
  it('should call #fastly once', () => {
    expect(fastly.calls.length).toEqual(1);
  });
  
  it('should call #fastly with token', () => {
    expect(fastly).toHaveBeenCalledWith('923b6bd5266a7f932e41962755bd4254', null);
  });
  
  it('should call #services', () => {
    expect(services).toHaveBeenCalled();
  });

  it('should call #services once', () => {
    expect(services.calls.length).toEqual(1);
  });

  it('should call #domains', () => {
    expect(domains).toHaveBeenCalled();
  });

  it('should call #domains once', () => {
    expect(domains.calls.length).toEqual(1);
  });
});
