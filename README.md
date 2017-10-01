# fastly-domains

> Client to list all the domains for a particular Fastly account

[![travis build](https://img.shields.io/travis/philippschulte/fastly-domains.svg?style=flat-square)](https://travis-ci.org/philippschulte/fastly-domains)
[![codecov coverage](https://img.shields.io/codecov/c/github/philippschulte/fastly-domains.svg?style=flat-square)](https://codecov.io/gh/philippschulte/fastly-domains)
[![npm version](https://img.shields.io/npm/v/fastly-domains.svg?style=flat-square)](https://npm.im/fastly-domains)
[![npm downloads](https://img.shields.io/npm/dm/fastly-domains.svg?style=flat-square)](https://npm.im/fastly-domains)
[![npm license](https://img.shields.io/npm/l/fastly-domains.svg?style=flat-square)](LICENSE)

[![NPM](https://nodei.co/npm/fastly-domains.png)](https://nodei.co/npm/fastly-domains/)

## Table of Contents

- [Problem](#problem)
- [Solution](#solution)
- [Security](#security)
- [Install](#install)
- [Usage](#usage)
- [Tests](#tests)
- [Contribute](#contribute)
- [License](#license)

## Problem

The [Fastly API](https://docs.fastly.com/api/) doesn't provide an endpoint to fetch all the domains associated with an account. It only provides an endpoint which lists all the domains for a particular service and version and another one which lists all the domains for the active version of a service.

## Solution

The solution is to perform a request to [GET /service](https://docs.fastly.com/api/config#service_74d98f7e5d018256e44d1cf820388ef8) first in order to fetch all services of a Fastly account before you send a request for each service to [GET /service/service_id/version/version/domain](https://docs.fastly.com/api/config#domain_6d340186666771f022ca20f81609d03d) in order to fetch all of the domains of a service.

That's exactly what the `fastly-domains` library does. Let's say you have 10 services then it needs to perform eleven requests (1 + 10) to the [Fastly API](https://docs.fastly.com/api/) in order to fetch all domains associated with an account.

The library doesn't provide an option to specify a particular version of a service since it fetches the domains of all serivces. Instead it uses the active version for each request to [GET /service/service_id/version/version/domain](https://docs.fastly.com/api/config#domain_6d340186666771f022ca20f81609d03d).

## Security

You'll need a [Fastly API Token](https://docs.fastly.com/api/auth#tokens) in order to use the `fastly-domains` library. Your token must have at least [global:read access](https://docs.fastly.com/api/auth#access). The token is necessary for every single invocation and won't be saved by the library!

## Install

This is a [Node.js](https://nodejs.org/) module available through the [npm registry](https://www.npmjs.com/). The `fastly-domains` library can be used locally in your scripts or globally in your `Terminal` or `Command Prompt`. Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

### Globally

```bash
$ npm install --global fastly-domains
```

### Locally

```bash
$ npm install --save fastly-domains
```

## Usage

### Globally

#### fastly-domains [command] [option]

| Commands | Options   | Alias | Type    | Required | Description                                  |
|----------|-----------|-------|---------|----------|----------------------------------------------|
| read     |           |       |         |          | List all the domains in the terminal         |
|          | --help    | -h    | boolean | false    | Show help                                    |
|          | --version | -v    | boolean | false    | Show version number                          |
|          | --token   | -t    | string  | true     | Fastly API token                             |
| create   |           |       |         |          | Write all the domains to fastly-domains.json |
|          | --help    | -h    | boolean | false    | Show help                                    |
|          | --version | -v    | boolean | false    | Show version number                          |
|          | --token   | -t    | string  | true     | Fastly API token                             |

### Locally

#### Promises

```javascript
const fastlyDomains = require('fastly-domains');

function handler() {
  fastlyDomains('<your_fastly_api_token>')
    .then(res => {
      res.domains.forEach(domain => console.log(domain.name));
    })
    .catch(err => {
      console.log(err.message);
    });
}
```

#### Async/Await

```javascript
const fastlyDomains = require('fastly-domains');

async function handler() {
  try {
    const res = await fastlyDomains('<your_fastly_api_token>');
    res.domains.forEach(domain => console.log(domain.name));
  } catch (err) {
    console.log(err.message);
  }
}
```

### Response Schema

```javascript
{
  // a list of all domains associated with a fastly account
  domains: [
    {
      version: 2,
      name: 'fastly-domains.com',
      service_id: '20Esr3c2mP2IO4661htKVo'
    },
    {
      version: 2,
      name: 'www.fastly-domains.com',
      service_id: '20Esr3c2mP2IO4661htKVo'
    }
  ],

  // the total number of all domains associated to a fastly account
  number_of_domains: 2,

  // the total number of all services associated to a fastly account
  number_of_services: 1
}
```

## Tests

To run the test suite, first install the dependencies, then run the [`npm test` command](https://docs.npmjs.com/cli/test):

```bash
$ npm install
$ npm test
```

## Contribute

PRs accepted. I am open to suggestions in improving this library. Commit by:

```bash
$ npm run commit
```

## License

Licensed under the [MIT License](LICENSE) © 2017 Philipp Schulte
