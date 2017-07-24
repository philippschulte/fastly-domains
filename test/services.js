'use strict';

const express = require('express');
const expect = require('expect');
const request = require('supertest');
const config = require('../src/config');
const services = require('../src/services');

describe('services.js', () => {
  const app = express();
  let userServices;
  let statusCode;

  before(async () => {
    userServices = await services(config.token);
    statusCode = 200;
  });

  app.get('/', (req, res) => {
    res.status(statusCode).json(userServices);
  });

  it('should response with a status 200 for valid request', done => {
    request(app)
    .get('/')
    .expect(200)
    .end(done);
  });

  it('should return an array', done => {
    request(app)
    .get('/')
    .expect(res => {
      expect(Array.isArray(res.body)).toBe(true);
    })
    .end(done);
  });

  it('should return a list of all services', done => {
    request(app)
    .get('/')
    .expect(res => {
      expect(res.body.length).toBeGreaterThanOrEqualTo(1);
    })
    .end(done);
  });

  it('should include version and id properties for each service', done => {
    request(app)
    .get('/')
    .expect(res => {
      expect(res.body[0]).toIncludeKeys([ 'version', 'id' ]);
    })
    .end(done);
  });
});
