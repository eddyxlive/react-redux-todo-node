const express = require('express');
const router = express.Router();
var todo = require('../controllers/todo.controller');

//retrieving todo
router.get('/list', todo.list);

//adding todo
router.post('/create', todo.create);

//get todo by id
router.get('/edit/:id', todo.getByID);

//update todo
router.put('/update', todo.update);

//deleting todo
router.delete('/delete/:id', todo.delete);

module.exports = router;