import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';

// BEGIN (write your solution here)
const Remove = ({ onTaskRemove, onCloseModal }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onTaskRemove();
    onCloseModal();
  };
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title h4">Remove</div>
          <button onClick={onCloseModal} type="button" className="btn-close" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <div className="form-group">
              <input className="btn btn-danger" type="submit" value="remove" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Remove;
