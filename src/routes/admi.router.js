
//Set-ExecutionPolicy Bypass -Scope Process
const express = require('express');
const router = express.Router()

const admiController = require('../controllers/admi.controller');

router.get('/', admiController.VerConductores);


module.exports = router;