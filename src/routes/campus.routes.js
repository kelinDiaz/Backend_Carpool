

const express = require('express');
const router = express.Router();
const campusController = require('../controllers/campus.controller');

router.get('/', campusController.getTodosLosCampus);

module.exports = router; 


