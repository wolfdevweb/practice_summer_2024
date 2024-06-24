const express = require('express');
//создан экземпляр класса Router который предоставляет функциональность маршрутизации для Express.js.
const router = express.Router();
const {
  createProject,
  getProjects,
  addTaskToSubProject,
} = require('../controllers/projectController');
//методы экземпляра класса Router определяют маршруты для обработки POST-запросов на URL /projects и /task
//которые соответственно вызывают функции createProject и addTaskToSubProject из project-контроллера.
router.post('/projects', createProject);

router.get('/projects', getProjects);
router.post('/task', addTaskToSubProject);

module.exports = router;
