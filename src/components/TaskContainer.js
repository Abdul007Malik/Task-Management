import React from "react";
import Task from "./Task";

const TaskContainer = ({
  type,
  searchText,
  onDelete,
  onStatusChange,
  tasks,
  taskById,
}) => {
  console.log(tasks);
  return (
    <div className="task-container">
      <div className="title">
        {type} {tasks.length}
      </div>
      <div className="list">
        {tasks.map((_) => {
          if (searchText && !taskById[_]?.name?.includes?.(searchText))
            return "";
          return (
            <Task
              key={_}
              {...taskById[_]}
              onDelete={() => typeof onDelete === "function" && onDelete(_)}
              onStatusChange={(e) =>
                typeof onStatusChange === "function" &&
                onStatusChange(_, e.target.value)
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskContainer;
