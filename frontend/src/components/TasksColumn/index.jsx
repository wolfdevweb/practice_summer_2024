import React, { useState } from 'react';
import './TasksColumn.css';
import ModalNewTask from '../ModalNewTask';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTaskToSubProjet } from '../../store/reducers/projectSlice';

const TaskColumn = ({ title, tasks, status, projectId, subProjectId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const sendTask = async ({ title, description }) => {
    try {
      const response = await axios.post('http://localhost:3005/api/task', {
        projectId,
        subProjectId,
        task: { title, description, status },
      });
      console.log(response.data);
      dispatch(addTaskToSubProjet(response.data.task));
      // fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  return (
    <div className="task-column">
      <h2>{title}</h2>
      <button onClick={handleOpen}> Add task</button>
      {tasks.map((task) => (
        <div key={task._id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
      ))}
      <ModalNewTask
        open={open}
        handleClose={handleClose}
        sendNewProject={sendTask}
      />
    </div>
  );
};

export default TaskColumn;
