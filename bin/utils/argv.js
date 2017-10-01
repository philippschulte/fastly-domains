'use strict';

const yargs = require('yargs');
const options = require('./options');
const validation = require('./validation');

const argv = yargs
  .usage('Usage: $0 [command] [option]')
  .command('read', 'List all the domains in the terminal', yargs => yargs.option('token', options.token).check(validation.checkTokenLength))
  .command('create', 'Write all the domains to fastly-domains.json', yargs => yargs.option('token', options.token).check(validation.checkTokenLength))
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .demandCommand(1, 'You need at least one command before moving on.')
  .argv;

module.exports = argv;
