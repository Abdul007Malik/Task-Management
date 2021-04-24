import React from "react";
import { TASK_STATUS } from "../shared/constants";

const Task = ({ name, onDelete, value, onStatusChange }) => {
  return (
    <div className="task">
      <span className="name">{name}</span>
      <div className="action">
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
      <div className="status">
        <select onChange={onStatusChange} value={value}>
          {TASK_STATUS.map((_) => (
            <option key={_.id}>{_.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Task;
