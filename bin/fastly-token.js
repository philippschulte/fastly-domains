'use strict';

const yargs = require('yargs');
const chalk = require('chalk');

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
      throw new Error(chalk.red('Your token is not a valid Fastly API token! Please try again.'));
    }
  })
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .argv;

module.exports = argv.token;
