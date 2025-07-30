

const express = require('express');
const router = express.Router();
const campusController = require('../controllers/campus.controller');

router.get('/', campusController.getTodosLosCampus);

router.post('/crear', campusController.crearCampusController);


module.exports = router; 


