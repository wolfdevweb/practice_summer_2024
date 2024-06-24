const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const subProjectSchema = new mongoose.Schema({
  title: String,
  tasks: [taskSchema],
});
const projectSchema = new mongoose.Schema({
  subprojects: [subProjectSchema],
  username: String,
  category: String,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
