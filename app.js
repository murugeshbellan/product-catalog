'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var swig = require('swig');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var lusca = require('lusca');
var csrf = require('csurf')
var routes = require('./routes/index');
var mongoose = require('mongoose');

var app = express();
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// security settings
app.use(session({
    name : 'sessionId',
    secret: 'asygkba1q',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(lusca.xframe('DENY'));

app.use(lusca.csp({
    policy: {
        'default-src': '\'self\'',
        'style-src': '\'self\'',
        'img-src': '\'self\'',
        'frame-ancestors': '\'none\''
    }
}));

app.use(csrf({ cookie: true }));

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('etag', true);

app.use(logger('dev'));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/productcatalog');

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
  });
} else {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
