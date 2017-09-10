'use strict';

const nock = require('nock');
const expect = require('expect');
const fastly = require('fastly-promises');
const domains = require('../src/domains');
const services = require('./response/services.response');
const response = require('./response/domains.response');

describe('domains.js', () => {
  const fastlyInstance = fastly('923b6bd5266a7f932e41962755bd4254', null);
  let res;

  nock('https://api.fastly.com')
    .get('/service/20Esr3c2mP2IO4661htKVo/version/2/domain')
    .reply(200, response.domainList);

  before(async () => {
    res = await domains(fastlyInstance, services.serviceList);
  });

  it('return value should exist', () => {
    expect(res).toExist();
  });

  it('return value should be an object', () => {
    expect(res).toBeA('object');
  });

  it('return value items should have domains, number_of_domains, and number_of_services properties', () => {
    expect(res).toIncludeKeys(['domains', 'number_of_domains', 'number_of_services']);
  });
});
