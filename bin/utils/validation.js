'use strict';

module.exports.checkTokenLength = argv => {
  if (argv.token.length === 32) {
    return true;
  } else {
    throw new Error('Your token is not a valid Fastly API token! Please try again.');
  }
};
