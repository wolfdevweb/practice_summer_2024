'use strict';
//импортируем модуль Express.js, который используется для создания веб-сервера
const express = require('express');
//импортируем функции из authController
const {
  register,
  login,
  verifyToken,
} = require('../controllers/authController');
//создан экземпляр класса Router который предоставляет функциональность маршрутизации для Express.js.
const router = express.Router();
//определяем маршруты для post- и get- запросов и функции их обработки
router.post('/register', register);
router.post('/login', login);
router.get('/verify-token', verifyToken);

module.exports = router;
