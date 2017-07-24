'use strict';

const express = require('express');
const expect = require('expect');
const request = require('supertest');
const config = require('../src/config');
const domains = require('../src/domains');

describe('domains.js', () => {
  const app = express();
  let userDomains;

  before(async () => {
    userDomains = await domains(config.token,[
      { version: 3, id: '5IwGxivGVTUMZ5iF0RvaHG' },
      { version: 2, id: '37zPl5ELMgZ2iGVv02qIac' }
    ]);
  });

  app.get('/', (req, res) => {
    res.status(200).json(userDomains);
  });

  it('should response with a status 200 for valid request', done => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });

  it('should return an object', done => {
    request(app)
      .get('/')
      .expect(res => {
        expect(res.body).toBeA('object');
      })
      .end(done);
  });

  it('should return a list of all domains', done => {
    request(app)
      .get('/')
      .expect(res => {
        expect(res.body.domains.length).toBeGreaterThanOrEqualTo(1);
      })
      .end(done);
  });

  it('should include domains, number_of_domains and number_of_services properties', done => {
    request(app)
      .get('/')
      .expect(res => {
        expect(res.body).toIncludeKeys([
          'domains',
          'number_of_domains',
          'number_of_services'
        ]);
      })
      .end(done);
  });
});
