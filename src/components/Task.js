import React from "react";
import { TASK_STATUS } from "../shared/constants";

const Task = ({ id, name, onDelete, status, onStatusChange }) => {
  return (
    <div className="task" task-id={id}>
      <div className="row1">
        <span className="task-title">{name}</span>
        <div className="action">
          <button type="button" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className="row2">
        <div className="status">
          <select onChange={onStatusChange} value={status}>
            {TASK_STATUS.all().map((_) => (
              <option key={_.id} value={_.id}>
                {_.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Task;
