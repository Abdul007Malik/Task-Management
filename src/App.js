import logo from "./logo.svg";
import "./App.css";
import TaskContainer from "./components/TaskContainer";
import { TASK_STATUS } from "./shared/constants";
import { useEffect, useState } from "react";
import { getUUID } from "./shared/utils";

function App() {
  let stored = localStorage.getItem("tasks"),
    storedObject;
  try {
    if (stored) storedObject = JSON.parse(stored);
  } catch (error) {
    storedObject = {
      byId: {},
      byStatus: {
        [TASK_STATUS.TODO]: [],
        [TASK_STATUS.INPROGRESS]: [],
        [TASK_STATUS.COMPLETED]: [],
      },
    };
  }
  const [tasks, setTasks] = useState(storedObject),
    [search, setSearch] = useState("");

  const onDelete = (id) => {
    if (!tasks.byId[id]) return alert("Task not found");
    const task = tasks.byId[id];
    let newTasks = Object.assign({}, tasks);

    newTasks.byId = { ...newTasks.byId };
    newTasks.byStatus = { ...newTasks.byStatus };

    newTasks.byStatus = {
      ...newTasks.byStatus,
      [task.status]: newTasks.byStatus[task.status].filter((_) => _ !== id),
    };

    delete newTasks.byId[id];
    setTasks(newTasks);
  };

  const onStatusChange = (id, changeTo) => {
    if (!tasks.byId[id]) return alert("Task not found");
    const task = tasks.byId[id];
    let newTasks = Object.assign({}, tasks);
    if (!changeTo || !changeTo.trim()) {
      return alert("Task status cannot be empty");
    }
    newTasks.byStatus = { ...newTasks.byStatus };

    newTasks.byStatus = Object.assign({}, newTasks.byStatus, {
      [task.status]: newTasks.byStatus[task.status].filter((_) => _ !== id),
    });

    newTasks.byStatus = Object.assign({}, newTasks.byStatus, {
      [changeTo]: newTasks.byStatus[changeTo].concat(id),
    });
    newTasks.byId = Object.assign({}, newTasks.byId, {
      [id]: { ...tasks.byId[id], status: changeTo },
    });

    setTasks(newTasks);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("task_form")),
      name = formData.get("task_name"),
      status = formData.get("task_status");

    let newTasks = Object.assign({}, tasks),
      id;

    if (!name || !name.trim()) {
      return alert("Task name cannot be empty");
    }
    if (!status || !status.trim()) {
      return alert("Task status cannot be empty");
    }
    id = getUUID();
    newTasks = {
      byId: {
        ...newTasks.byId,
        [id]: { name, status },
      },
      byStatus: {
        ...newTasks.byStatus,
        [status]: newTasks.byStatus[status].concat(id),
      },
    };

    setTasks(newTasks);
  };

  const onSearch = (e) => {
    setSearch(e?.target?.value);
  };

  useEffect(() => {
    if (tasks) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App container">
      <div className="search-container">
        <input name="search" onKeyDown={onSearch} placeholder="Filter Issues" />
      </div>
      <div className="form">
        <form id="task_form" onSubmit={onSubmit}>
          <input name="task_name" />
          <select name="task_status">
            <option value="">Select Status</option>
            {TASK_STATUS.all().map((_) => (
              <option key={_.id} value={_.id}>
                {_.name}
              </option>
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
      </div>
      <div className="task-containers">
        <TaskContainer
          searchText={search}
          type="TO DO"
          tasks={tasks.byStatus[TASK_STATUS.TODO] || []}
          taskById={tasks.byId}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        ></TaskContainer>
        <TaskContainer
          searchText={search}
          type="IN PROGRESS"
          tasks={tasks.byStatus[TASK_STATUS.INPROGRESS] || []}
          taskById={tasks.byId}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        ></TaskContainer>
        <TaskContainer
          searchText={search}
          type="COMPLETE"
          tasks={tasks.byStatus[TASK_STATUS.COMPLETED] || []}
          taskById={tasks.byId}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        ></TaskContainer>
      </div>
    </div>
  );
}

export default App;
