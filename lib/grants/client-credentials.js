'use strict';

const GrantParams = require('../grant-params');

module.exports = class ClientCredentials {
  constructor(config, client) {
    this.config = config;
    this.client = client;
  }

  /**
   * Requests and returns an access token from the authorization server
   *
   * @param {Object} params
   * @param {String|Array<String>} [params.scope] A String or array of strings representing the application privileges
   *
   * @return {Promise}
   */
  async getToken(params = {}) {
    const parameters = GrantParams.forGrant('client_credentials', params);

    return this.client.request(this.config.auth.tokenPath, parameters.toObject());
  }
};