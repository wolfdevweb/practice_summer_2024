import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { setProject } from '../../store/reducers/projectSlice';

export default function SimpleAccordion({ id, title, subprojects }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<></>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <img
              src="./img/nav/arrowDown.png"
              alt="Icon"
              style={{ marginRight: 8 }}
            />
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            {subprojects.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() =>
                    dispatch(setProject({ subProject: item, projectId: id }))
                  }
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
