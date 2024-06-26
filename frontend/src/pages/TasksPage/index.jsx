import React from 'react';
import { useSelector } from 'react-redux';
import TaskColumn from '../../components/TasksColumn';
import { filterTasks } from '../../utils';
import './TasksPage.css';

const TaskPage = () => {
  const { subProject, projectId } = useSelector((state) => state.project);
  return (
    <div>
      <h1>{subProject.title}</h1>
      <h2>{projectId}</h2>
      {projectId && (
        <div className="tasks-block">
          <TaskColumn
            title={'In Progress'}
            status="inProgress"
            subProjectId={subProject._id}
            projectId={projectId}
            tasks={filterTasks(subProject.tasks, 'inProgress')}
          />{' '}
          <TaskColumn
            title={'Pending'}
            status="pending"
            subProjectId={subProject._id}
            projectId={projectId}
            tasks={filterTasks(subProject.tasks, 'pending')}
          />{' '}
          <TaskColumn
            title={'Complete'}
            status="complete"
            subProjectId={subProject._id}
            projectId={projectId}
            tasks={filterTasks(subProject.tasks, 'complete')}
          />{' '}
          <TaskColumn
            title={'Do later'}
            status="doLater"
            subProjectId={subProject._id}
            projectId={projectId}
            tasks={filterTasks(subProject.tasks, 'doLater')}
          />
        </div>
      )}
    </div>
  );
};

export default TaskPage;
