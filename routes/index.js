'use strict';

// Dependencies
const activity = require('./activity');

/*
 * GET home page.
 */
exports.index = (req, res) => {
    if (!req.session.token) {
        res.render('index', {
            title: 'Unauthenticated',
            errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
        });
    } else {
        res.render('index', {
            title: 'Journey Builder Activity',
            results: activity.logExecuteData,
        });
    }
};

/*
 * POST login handler.
 */
exports.login = (req, res) => {
    console.log('req.body:', req.body);

    // Assuming you handle session tokens or other login logic here
    req.session.token = 'some-token'; // You might want to set a real token here

    res.redirect('/');
};

/*
 * POST logout handler.
 */
exports.logout = (req, res) => {
    req.session.token = '';

    // Redirect to home or login page after logout
    res.redirect('/');
};
