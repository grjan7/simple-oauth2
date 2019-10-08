'use strict';

const Wreck = require('@hapi/wreck');
const debug = require('debug')('simple-oauth2:client');
const RequestOptions = require('./request-options');

const defaultHeaders = {
  Accept: 'application/json',
};

const defaultHttpOptions = {
  json: 'strict',
  redirects: 20,
};

module.exports = class Client {
  constructor(config) {
    const httpOptions = Object.assign({}, defaultHttpOptions, config.http, {
      baseUrl: config.auth.tokenHost,
      headers: Object.assign({}, defaultHeaders, (config.http && config.http.headers)),
    });

    this.config = config;
    this.client = Wreck.defaults(httpOptions);
  }

  async request(url, params, opts) {
    const requestOptions = new RequestOptions(this.config, params);
    const options = requestOptions.toObject(opts);

    debug('Creating request to: (POST) %s', url);
    debug('Using request options: %j', options);

    const result = await this.client.post(url, options);

    return result.payload;
  }
};