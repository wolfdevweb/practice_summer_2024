const Project = require('../models/Project');
//Контроллеры createProject, getProjects, и addTaskToSubProject обрабатывают соответствующие запросы.
exports.createProject = async (req, res) => {
  const { category } = req.body; // Предполагаем, что категория передается в теле запроса
  const { title } = req.body; // Название подпроекта
  const { username } = req.body; // Имя пользователя передается в теле запроса

  try {
    // Поиск проекта по категории
    let project = await Project.findOne({ category });

    // Если проект не найден, создаем новый проект
    if (!project) {
      project = new Project({ username, category, subprojects: [] });
    }

    // Добавляем новый подпроект к проекту
    project.subprojects.push({ title, tasks: [] });

    // Сохраняем проект
    await project.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTaskToSubProject = async (req, res) => {
  console.log(req.body);
  const { projectId } = req.body; // Предполагаем, что категория передается в теле запроса
  const { subProjectId } = req.body; // Название подпроекта
  const { task } = req.body;
  const { title, description, status } = task;
  try {
    // Находим проект по ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Проект не найден' });
    }

    // Находим сабпроект внутри проекта по ID
    const subProject = project.subprojects.id(subProjectId);

    if (!subProject) {
      return res.status(404).json({ error: 'Сабпроект не найден' });
    }

    // Создаем новый таск
    const newTask = {
      title,
      description,
      status,
    };

    // Добавляем таск в массив тасков сабпроекта
    subProject.tasks.push(newTask);

    // Сохраняем изменения в базе данных
    await project.save();

    // Возвращаем успешный ответ
    res
      .status(201)
      .json({ message: 'Таск успешно добавлен в сабпроект', task: newTask });
  } catch (error) {
    // Обработка ошибок
    console.error('Ошибка при добавлении таска в сабпроект:', error.message);
    res.status(500).json({ error: 'Что-то пошло не так. Попробуйте снова.' });
  }
};
