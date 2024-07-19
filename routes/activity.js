'use strict';

const express = require('express');
const router = express.Router();
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtdecoder.js')); // Ensure jwtdecoder.js is available
const http = require('https');

// Initialize an array to log execution data
exports.logExecuteData = [];

// Middleware to parse JSON bodies
router.use(express.json());

// Define routes for custom activity endpoints
router.post('/publish', (req, res) => {
    console.log('Publish request received');
    console.log(req.body);
    res.status(200).send('Publish endpoint hit');
});

router.post('/validate', (req, res) => {
    console.log('Validate request received');
    console.log(req.body);
    res.status(200).send('Validate endpoint hit');
});

router.post('/execute', (req, res) => {
    console.log('Execute request received');
    console.log(req.body);

    // Log execute data
    exports.logExecuteData.push(req.body);

    // Example: Processing without JWT verification
    // If you need to process JWT, you must provide a secret
    // const token = req.body.token; // Assuming token is sent in the request body
    // JWT(token, secret, (err, decoded) => {
    //     if (err) {
    //         console.error('JWT verification failed:', err);
    //         return res.status(400).send('JWT verification failed');
    //     }

    //     console.log('JWT verified successfully:', decoded);
    //     res.status(200).send('Execute endpoint hit');
    // });

    res.status(200).send('Execute endpoint hit');
});

router.post('/stop', (req, res) => {
    console.log('Stop request received');
    console.log(req.body);
    res.status(200).send('Stop endpoint hit');
});

module.exports = router;
