'use strict';

const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'index.js'));
const util = require('util');
const http = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });

    
}

/**
 * POST Handler for /edit route of Activity.
 */
exports.edit = function (req, res) {
    console.log("Handling Edit Request");
    logData(req);
    res.send(200, 'Edit');
};

/**
 * POST Handler for /save route of Activity.
 */
exports.save = function (req, res) {
    console.log("Handling Save Request");
    logData(req);
    res.send(200, 'Save');
};

/**
 * POST Handler for /execute route of Activity.
 */
exports.execute = function (req, res) {
    console.log("Handling Execute Request");
    const requestBody = req.body.inArguments[0];

    // Extracting the required parameters from the request
    const { accountSid, authToken, to, messagingService, body } = requestBody;

    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: body,
            messagingServiceSid: messagingService,
            to: to
        })
        .then(message => console.log(message.sid))
        .catch(error => console.error("Error sending message: ", error))
        .finally(() => {
            logData(req);
            res.send(200, 'Execute');
        });
};

/**
 * POST Handler for /publish route of Activity.
 */
exports.publish = function (req, res) {
    console.log("Handling Publish Request");
    logData(req);
    res.send(200, 'Publish');
};

/**
 * POST Handler for /validate route of Activity.
 */
exports.validate = function (req, res) {
    console.log("Handling Validate Request");
    logData(req);
    res.send(200, 'Validate');
};
