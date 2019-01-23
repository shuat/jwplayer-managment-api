'use strict';

const queryString = require("querystring");
const axios = require("axios");
const crypto = require("crypto");
const nonce = require("nonce")(8);
const { format } = require("url");
const path = require('path');

class JwPlatformApi {
    constructor(config = {}) {
        this.config = config;
        if (!this.config.key) {
            throw new Error("Must provide a jwPlatform key in config.key");
        }
        if (!this.config.secret) {
            throw new Error("Must provide a jwPlatform secret in config.secret");
        }

        this.config.protocol = this.config.protocol || "https";
        this.config.baseUrl = this.config.baseUrl || "api.jwplatform.com";
    }

    generateUrl(path, params) {
        return format({
            hostname: this.config.baseUrl,
            protocol: this.config.protocol,
            query: this.getParams(params),
            pathname: path
        });
    }

    getParams(params) {
        const defaultParams = {
            api_format: "json",
            api_key: this.config.key,
            api_nonce: nonce(),
            api_timestamp: Math.floor(Date.now() / 1000)
        };
        params = Object.assign({}, defaultParams, params);
        const allParams = Object.assign({}, params);

        const sortedParams = {};
        Object.keys(allParams)
            .sort()
            .forEach(function(key) {
                sortedParams[key] = allParams[key];
            });

        const input = queryString.stringify(sortedParams);

        params.api_signature = crypto
            .createHash("sha1")
            .update(input + this.config.secret, "utf8")
            .digest("hex");

        return params;
    }

    makeRequest(endpoint = '/videos/list', params = {}, version = 'v1', fullResponse = false){
        const requestPath = path.join(version,endpoint);
        const url = this.generateUrl(requestPath, params);
        return axios.get(url).then(response => {
            return fullResponse ? response : response.data;
        });
    }
}

module.exports = JwPlatformApi;
