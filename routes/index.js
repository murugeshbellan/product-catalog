'use strict';

var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product.server.controller');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/add-product', function(req, res, next) {
    return productCtrl.addProduct(req, res);
});

router.post('/add-product', function(req, res, next) {
    return productCtrl.create(req, res);
});

router.get('/view-products', function(req, res, next) {
    return productCtrl.viewProducts(req, res);
});

//test
router.get('/load-dummy-products', function(req, res, next) {
    return productCtrl.loadDummyProducts(req, res);
});

module.exports = router;
