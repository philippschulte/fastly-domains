#!/usr/bin/env node

'use strict';

const ora = require('ora');
const fs = require('fs-extra');
const chalk = require('chalk');
const argv = require('./utils/argv');
const fastlyDomains = require('../src/index');
const response = require('../test/response/domains.response');

const command = argv._[0];
const spinner = ora(chalk.yellow('Fetching domains')).start();

fastlyDomains(argv.token)
  .then(res => {
    spinner.succeed(chalk.green('Fetching domains'));
    
    switch (command) {
      case 'read':
        spinner.info(chalk.blue(`The account has ${res.number_of_services} services and ${res.number_of_domains} domains:`));
        res.domains.forEach(domain => console.log(chalk.magentaBright(domain.name)));
        break;
      case 'create':
        spinner.info(chalk.blue(`All the domains have been saved to ${process.cwd()}/fastly-domains.json`));
        return fs.outputFile(`${process.cwd()}/fastly-domains.json`, JSON.stringify(res, null, 2));
    }
  })
  .catch(err => {
    spinner.fail(chalk.red('Fetching domains'));

    if (err.message === response.domainList.error[401] || err.message === response.domainList.error[404]) {
      spinner.info(chalk.blue(err.message));
    } else {
      spinner.info(chalk.blue('Something went wrong! Please check your internet connection and try it again.'));
    } 
  });
