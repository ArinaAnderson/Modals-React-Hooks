import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import getModal from './modals/index.js';
import Add from './modals/Add.jsx';
import Remove from './modals/Remove.jsx';
import Rename from './modals/Rename.jsx';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  const [currentTaskId, setCurrentTaskId] = useState(null);

  const handleModalOpen = (modalType) => {
    setShowModal(modalType);
  };

  const handleModalClose = () => {
    setShowModal(null);
  };

  const hadnleRemoveTaskBtnClick = (task) => {
    setCurrentTask(task);
    handleModalOpen('removing');
  };

  const hadnleEditTaskBtnClick = (task) => {
    setCurrentTask(task);
    handleModalOpen('renaming');
  };

  const renderTask = (task) => {
    return (
      <div key={task.id}>
        <span className="mr-3">{task.val}</span>
        <button
          onClick={() => hadnleEditTaskBtnClick(task)}
          type="button"
          className="border-0 btn btn-link mr-3 text-decoration-none"
          data-testid="item-rename">
            rename
          </button>
        <button
          onClick={() => hadnleRemoveTaskBtnClick(task)}
          type="button"
          className="border-0 btn btn-link text-decoration-none"
          data-testid="item-remove">
            remove
          </button>
      </div>
    )
  };

  const renderModal = (modalType) => {
    if (!modalType) {
      return null;
    }

    const Component = getModal(modalType);
    return <Component setTasks={setTasks} onModalClose={handleModalClose} currentTask={currentTask} />;
    /*
    switch (modalType) {
      case 'adding':
        const Component = getModal(modalType);
        console.log('COMPONENT',<Component />)
        return <Component onTaskSubmit={handleAddTask} onCloseModal={handleModalClose} />;
        // return <Add onTaskSubmit={handleAddTask} onCloseModal={handleModalClose} />;
      case 'removing':
        return <Remove onTaskRemove={handleRemoveTask} onCloseModal={handleModalClose} />;
      case 'renaming':
        return <Rename onTaskEdit={handleEditTask} onCloseModal={handleModalClose} initialTaskText={currentTaskVal} />;
      default:
        throw new Error('unkbnown modal type');
    }
    */
  };

  return (
    <>
      <div className="mb-3">
        <button onClick={() => handleModalOpen('adding')} type="button" data-testid="item-add" className="btn btn-secondary">add</button>
      </div>
      {tasks.map((task) => renderTask(task))}
      {renderModal(showModal)}
    </>
  );
  
};

export default App;
