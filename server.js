'use strict';

// Module Dependencies
const express = require('express');
const path = require('path');
const errorhandler = require('errorhandler');
const http = require('http');
const routes = require('./routes');
const activity = require('./routes/activity');

const app = express();

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if (app.get('env') === 'development') {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', routes.index);
app.post('/login', routes.login);
app.post('/logout', routes.logout);

// Custom Hello World Activity Routes
app.post('/journeybuilder/save', activity.save);
app.post('/journeybuilder/validate', activity.validate);
app.post('/journeybuilder/publish', activity.publish);
app.post('/journeybuilder/execute', activity.execute);

// Create and Start HTTP Server
http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
