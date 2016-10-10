'use strict';

var Product = require('../models/product.server.model');

var getFloatingNumber = function (numberValue) {
    return (numberValue && !isNaN(numberValue) ? parseFloat(numberValue) : undefined);
};

module.exports.addProduct = function (req, res) {
    res.render('add-product', { csrfToken: req.csrfToken() });
};

module.exports.viewProducts = function (req, res) {
    var locals = {};

    Product.find(function (err, results) {
        if (err) {
            res.render('error');
        } else {
            locals.products = results;
            res.render('view-products', locals);
        }
    });
};

module.exports.create = function (req, res) {

    var entry = new Product({
        name: req.body.productName,
        image: req.body.image,
        description: req.body.description,
        colour: req.body.colour,
        price: getFloatingNumber(req.body.price),
        weight: getFloatingNumber(req.body.weight)
    });

    entry.save(function (err) {
        if (err) {
            console.log('error while saving...', err);
            res.status(500).json({status: 'error'});
        } else {
            console.log('New Product was saved!');
            res.status(201).json({status: 'success'});
        }
    });
};

// for test
module.exports.loadDummyProducts = function (req, res) {

    try {
        var dummyData = require('../data/product.dummy.data')();

        Product.create(dummyData, function (err) {
            if (err) {
                console.log('error while loading dummy data...', err);
                res.status(500).json({status: 'error'});
            } else {
                res.status(201).json({status: 'success'});
            }
        });
        
    } catch (err) {
        console.log('error...', err);
        res.status('500').json({status: 'error'});
    }
    
};
