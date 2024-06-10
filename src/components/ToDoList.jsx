import React, { useReducer, useEffect } from "react";
import {
  faCheck,
  faTrash,
  faArrowUp,
  faArrowDown,
  faAdd,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Initial state
const initialState = {
  tasks: [],
  newTask: "",
  isEditing: false,
  editIndex: null,
};

// Action types
const types = {
  SET_TASKS: "set_tasks",
  SET_NEW_TASK: "set_new_task",
  ADD_TASK: "add_task",
  UPDATE_TASK: "update_task",
  DELETE_TASK: "delete_task",
  EDIT_TASK: "edit_task",
  MOVE_TASK_UP: "move_task_up",
  MOVE_TASK_DOWN: "move_task_down",
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case types.SET_TASKS:
      return { ...state, tasks: action.payload };
    case types.SET_NEW_TASK:
      return { ...state, newTask: action.payload };
    case types.ADD_TASK:
      return { ...state, tasks: [...state.tasks, state.newTask], newTask: "" };
    case types.UPDATE_TASK:
      const updatedTasks = [...state.tasks];
      updatedTasks[state.editIndex] = state.newTask;
      return {
        ...state,
        tasks: updatedTasks,
        newTask: "",
        isEditing: false,
        editIndex: null,
      };
    case types.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((_, i) => i !== action.payload),
      };
    case types.EDIT_TASK:
      return {
        ...state,
        newTask: state.tasks[action.payload],
        isEditing: true,
        editIndex: action.payload,
      };
    case types.MOVE_TASK_UP:
      if (action.payload > 0) {
        const movedUpTasks = [...state.tasks];
        [movedUpTasks[action.payload], movedUpTasks[action.payload - 1]] = [
          movedUpTasks[action.payload - 1],
          movedUpTasks[action.payload],
        ];
        return { ...state, tasks: movedUpTasks };
      }
      return state;
    case types.MOVE_TASK_DOWN:
      if (action.payload < state.tasks.length - 1) {
        const movedDownTasks = [...state.tasks];
        [movedDownTasks[action.payload], movedDownTasks[action.payload + 1]] = [
          movedDownTasks[action.payload + 1],
          movedDownTasks[action.payload],
        ];
        return { ...state, tasks: movedDownTasks };
      }
      return state;
    default:
      console.warn("Unknown action type:", action.type);
      return state;
  }
}

function ToDoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tasks, newTask, isEditing, editIndex } = state;

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      console.log("Loaded tasks from localStorage:", JSON.parse(storedTasks));
      dispatch({ type: types.SET_TASKS, payload: JSON.parse(storedTasks) });
    } else {
      console.log("No tasks in localStorage, initializing with default tasks.");
      const defaultTasks = ["Take a shower", "Eat breakfast", "Go to work"];
      dispatch({ type: types.SET_TASKS, payload: defaultTasks });
      localStorage.setItem("tasks", JSON.stringify(defaultTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      console.log("Saving tasks to localStorage:", tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  function handleInputChange(event) {
    dispatch({ type: types.SET_NEW_TASK, payload: event.target.value });
  }

  function addTask() {
    if (newTask.trim() !== "") {
      dispatch({ type: types.ADD_TASK });
    }
  }

  function updateTask() {
    if (newTask.trim() !== "") {
      dispatch({ type: types.UPDATE_TASK });
    }
  }

  function deleteTask(index) {
    dispatch({ type: types.DELETE_TASK, payload: index });
  }

  function editTask(index) {
    dispatch({ type: types.EDIT_TASK, payload: index });
  }

  function moveTaskUp(index) {
    dispatch({ type: types.MOVE_TASK_UP, payload: index });
  }

  function moveTaskDown(index) {
    dispatch({ type: types.MOVE_TASK_DOWN, payload: index });
  }

  return (
    <>
      <section className="container to-do-list-section">
        <div className="to-do-list">
          <h1>To-Do List</h1>
        </div>

        <section className="add-section">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={handleInputChange}
          />
          <button
            className="add-button"
            onClick={isEditing ? updateTask : addTask}
          >
            <FontAwesomeIcon icon={isEditing ? faCheck : faAdd} />
          </button>
        </section>

        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className="text">{task}</span>
              <button className="edit-button" onClick={() => editTask(index)}>
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button
                className="move-up-button"
                onClick={() => moveTaskUp(index)}
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
              <button
                className="move-down-button"
                onClick={() => moveTaskDown(index)}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

export default ToDoList;
