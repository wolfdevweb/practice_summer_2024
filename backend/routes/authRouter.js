'use strict';

const express = require('express');
const {
  register,
  login,
  verifyToken,
} = require('../controllers/authController');
//создан экземпляр класса Router который предоставляет функциональность маршрутизации для Express.js.
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify-token', verifyToken);

module.exports = router;
