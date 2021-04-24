export const TASK_STATUS = {
  TODO: "TODO",
  INPROGRESS: "INPROGRESS",
  COMPLETED: "COMPLETED",
  byLabel: {
    TODO: "Todo",
    INPROGRESS: "In Progress",
    COMPLETED: "Completed",
  },
  all: () => [
    { id: "TODO", name: "Todo" },
    { id: "INPROGRESS", name: "In Progress" },
    { id: "COMPLETED", name: "Completed" },
  ],
};
