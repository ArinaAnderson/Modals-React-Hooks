import React, { useEffect, useRef, useState } from 'react';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

const Rename = ({ setTasks, onModalClose, currentTask}) => {
  const [taskText, setTaskText] = useState(currentTask.val);

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTasks((prevVal) => {
      const taskToEditId = prevVal.findIndex((el) => el.id === currentTask.id);
      const beforeTask = prevVal.slice(0, taskToEditId);
      const afterTask = prevVal.slice(taskToEditId + 1);
      const updatedTasks = beforeTask.concat({ val: taskText, id: currentTask.id }, afterTask);
      return updatedTasks;
    });

    onModalClose();
    // setTaskText('');
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title h4">Rename</div>
          <button onClick={onModalClose} type="button" className="btn-close" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className="form-group">
              <input onChange={handleInputChange} className="form-control" data-testid="input-body" name="body" required="" value={taskText} />
            </div>
            <input className="btn btn-primary" type="submit" value="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Rename;
