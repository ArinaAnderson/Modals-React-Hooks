import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import Add from './modals/Add.jsx';
import Remove from './modals/Remove.jsx';
import Rename from './modals/Rename.jsx';

// BEGIN (write your solution here)
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentTaskVal, setCurrentTaskVal] = useState(null);

  const handleOpenModal = (modalType) => {
    setShowModal(modalType);
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const handleAddTask = (task) => {
    console.log(JSON.stringify(task, null, '  '));
    setTasks((prevVal) => ([...prevVal, task]));
  };

  const handleRemoveTask = () => { // for modal formsubmit
    const filteredTasks = tasks.filter((task) => task.id !== currentTaskId);
    setTasks(filteredTasks);
  };

  const handleEditTask = (taskText) => {
    console.log('CURRENTTASKID', currentTaskId);
    const taskToEditId = tasks.findIndex((el) => el.id === currentTaskId);
    console.log('EDIT TASK', taskToEditId);
    console.log('TASK EDITED', { val: taskText, id: currentTaskId })
    const beforeTask = tasks.slice(0, taskToEditId);
    const afterTask = tasks.slice(taskToEditId + 1);
    const updatedTasks = beforeTask.concat({ val: taskText, id: currentTaskId }, afterTask);
    setTasks(updatedTasks);
  };

  const hadnleRemoveTaskBtnClick = (taskId) => {
    setCurrentTaskId(taskId);
    handleOpenModal('removing');
  };

  const hadnleEditTaskBtnClick = (taskId, taskVal) => {
    setCurrentTaskId(taskId);
    setCurrentTaskVal(taskVal);
    handleOpenModal('renaming');
  };

  const renderTask = ({ val, id }) => {
    return (
      <div key={id}>
        <span className="mr-3">{val}</span>
        <button
          onClick={() => hadnleEditTaskBtnClick(id, val)}
          type="button"
          className="border-0 btn btn-link mr-3 text-decoration-none"
          data-testid="item-rename">
            rename
          </button>
        <button
          onClick={() => hadnleRemoveTaskBtnClick(id)}
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
    switch (modalType) {
      case 'adding':
        return <Add onTaskSubmit={handleAddTask} onCloseModal={handleCloseModal} />;
      case 'removing':
        return <Remove onTaskRemove={handleRemoveTask} onCloseModal={handleCloseModal} />;
      case 'renaming':
        return <Rename onTaskEdit={handleEditTask} onCloseModal={handleCloseModal} initialTaskText={currentTaskVal} />;
      default:
        throw new Error('unkbnown modal type');
    }
  };

  return (
    <>
      <div className="mb-3">
        <button onClick={() => handleOpenModal('adding')} type="button" data-testid="item-add" className="btn btn-secondary">add</button>
      </div>
      {tasks.map((task) => renderTask(task))}
      {renderModal(showModal)}
    </>
  );
  
};

export default App;
