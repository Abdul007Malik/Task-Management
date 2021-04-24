import React from "react";
import Task from "./Task";

const TaskContainer = ({ type, onDelete, onStatusChange, tasks, taskById }) => {
  console.log(tasks);
  return (
    <div className="task-container">
      <div className="title">
        {type} {tasks.length}
      </div>
      <div className="list">
        {tasks.map((_) => (
          <Task
            key={_}
            {...taskById[_]}
            onDelete={() => typeof onDelete === "function" && onDelete(_)}
            onStatusChange={(e) =>
              typeof onStatusChange === "function" &&
              onStatusChange(_, e.target.value)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TaskContainer;
