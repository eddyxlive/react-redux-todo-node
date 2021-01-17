'use strict';

var mongoose = require('mongoose'),
        Todo = mongoose.model('Todo');

var crud = require('./crud.controller')('Todo', 'name');

module.exports = crud;

