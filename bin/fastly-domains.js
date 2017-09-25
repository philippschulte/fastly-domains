#!/usr/bin/env node

'use strict';

const ora = require('ora');
const chalk = require('chalk');
const fastly = require('../src/index');
const token = require('./fastly-token');
const response = require('../test/response/domains.response');

const spinner = ora(chalk.yellow('Fetching domains')).start();

fastly(token)
  .then(domains => {
    spinner.succeed(chalk.green('Fetching domains'));
    console.log(chalk.dim(JSON.stringify(domains, null, 2)));
  })
  .catch(err => {
    spinner.fail(chalk.red('Fetching domains'));

    if (err.message === response.domainList.error[401] || err.message === response.domainList.error[404]) {
      spinner.info(chalk.blue(err.message));
    } else {
      spinner.info(chalk.blue('Something went wrong! Please check your internet connection and try it again.'));
    } 
  });
