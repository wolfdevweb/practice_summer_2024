import React, { useEffect, useState } from 'react';
import SimpleAccordion from '../AppAccordion';
import { marketingAccordionData, productAccordionData } from '../../const';
import './AppSideBar.css';
import ModalNewProject from '../ModalNewProject';
import axios from 'axios';
import { useSelector } from 'react-redux';
const AppSideBar = () => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { username } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/projects');
      console.log(response.data);
      setProjects(response.data);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleSubmit = async ({ title, category }) => {
    try {
      const response = await axios.post('http://localhost:3005/api/projects', {
        title,
        category,
        username,
      });
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  return (
    <div className="sidebar">
      <button onClick={handleOpen}>+ New Project</button>
      {projects.map((item) => (
        <SimpleAccordion
          id={item._id}
          title={item.category}
          subprojects={item.subprojects}
        />
      ))}

      <ModalNewProject
        open={open}
        sendNewProject={handleSubmit}
        handleClose={handleClose}
      />
    </div>
  );
};

export default AppSideBar;
