import React, { useEffect, useRef, useState } from 'react';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

// BEGIN (write your solution here)
const Rename = ({ onTaskEdit, onCloseModal, initialTaskText}) => {
  const [taskText, setTaskText] = useState(initialTaskText);

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onTaskEdit(taskText);
    onCloseModal();
    // setTaskText('');
  };

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title h4">Rename</div>
          <button onClick={onCloseModal} type="button" className="btn-close" aria-label="Close"></button>
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
