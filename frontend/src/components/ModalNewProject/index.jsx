import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalNewProject({ open, handleClose, sendNewProject }) {
  const [data, setData] = useState({ category: '', title: '' });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendNewProject(data);
    handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="form" onSubmit={handleSubmit}>
            {' '}
            <TextField
              id="outlined-basic1"
              name="category"
              value={data.category}
              onChange={handleChange}
              label="category"
              variant="outlined"
            />
            <TextField
              id="outlined-basic2"
              name="title"
              value={data.title}
              onChange={handleChange}
              label="title"
              variant="outlined"
            />
            <button type="submit">Submit</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
