#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const fastly = require('../src/index');

const argv = yargs
  .options({
    'token': {
      alias: 't',
      describe: 'Fastly API token with read access',
      demandOption: true,
    }
  })
  .check(argv => {
    if (argv.token.length === 32) {
      return true;
    } else {
      throw new Error('Your token is not a valid Fastly API token! Please try again.');
    }
  })
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .argv;

fastly(argv.token)
  .then(domains => {
    console.log(JSON.stringify(domains, null, 2));
  })
  .catch(err => {
    console.error(err.message);
  });
