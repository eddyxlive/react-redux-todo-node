'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var errorHandler = require('./errors.controller');

const config = require('../config/mongo');

module.exports = function (modelName, sortBy) {

    var Model = mongoose.model(modelName);
    return {
        create: function (req, res) {
            var model = new Model(req.body);
            model.save(function (err) {
                if (err) {
                    res.json({ 'success': false, 'message': errorHandler.getErrorMessage(err) });
                } else {
                    res.json({ 'success': true, 'message': 'Successfully added',data:model });
                }
            });
        },
        read: function (req, res) {
            res.json(req.modelName);
        },
        update: function (req, res) {
            var model = req.modelName;
            var data = req.body;
            Model.update({ _id: data._id }, { $set: data }, function (err, result) {
                if (err) {
                    res.json({ 'success': false, 'message': errorHandler.getErrorMessage(err) });
                } else {
                    res.json({ 'success': true, 'message': 'Successfully updated',data: data });
                }
            });
        },
        delete: function (req, res, next) {
            Model.deleteOne({ _id: req.params.id }, function (err, result) {
                if (err) {
                    res.json({ 'success': false, 'message': errorHandler.getErrorMessage(err) });
                } else {
                    res.json({ 'success': true, 'message': 'Successfully deleted' });
                }
            });
        },
        list: function (req, res) {
            var query = {};
            if (req.query.filter) {
                query = req.query.filter;
            }

            Model.find(query).sort(sortBy).exec(function (err, models) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(models);
                }
            });
        },
        getByID: function (req, res, next) {
            Model.findById({ _id: req.params.id }, function (err, model) {
                if (err)
                    return next(err);
                if (err) {
                    return res.status(404).send({
                        message: modelName + ' not found'
                    });
                } else {
                    res.json(model)
                }
            });
        }
    };
};
