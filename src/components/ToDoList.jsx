import React, { useState, useEffect } from "react";
import {
  faCheck,
  faTrash,
  faArrowUp,
  faArrowDown,
  faAdd,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToDoList() {
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      console.log("Loaded tasks from localStorage:", JSON.parse(storedTasks));
      setTask(JSON.parse(storedTasks));
    } else {
      console.log("No tasks in localStorage, initializing with default tasks.");
      const defaultTasks = ["Take a shower", "Eat breakfast", "Go to work"];
      setTask(defaultTasks);
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
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTask((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        console.log("Updated tasks after adding:", updatedTasks);
        return updatedTasks;
      });
      setNewTask("");
    }
  }

  function updateTask() {
    if (newTask.trim() !== "") {
      setTask((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[editIndex] = newTask;
        console.log("Updated tasks after editing:", updatedTasks);
        return updatedTasks;
      });
      setNewTask("");
      setIsEditing(false);
      setEditIndex(null);
    }
  }

  // The _ is a convention to indicate that we are not using the value
  function deleteTask(index) {
    setTask((prevTasks) => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      console.log("Updated tasks after deleting:", updatedTasks);
      return updatedTasks;
    });
  }

  function editTask(index) {
    setNewTask(tasks[index]);
    setIsEditing(true);
    setEditIndex(index);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      setTask((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index - 1]] = [
          updatedTasks[index - 1],
          updatedTasks[index],
        ];
        console.log("Updated tasks after moving up:", updatedTasks);
        return updatedTasks;
      });
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      setTask((prevTasks) => {
        const updatedTasks = [...prevTasks];
        [updatedTasks[index], updatedTasks[index + 1]] = [
          updatedTasks[index + 1],
          updatedTasks[index],
        ];
        console.log("Updated tasks after moving down:", updatedTasks);
        return updatedTasks;
      });
    }
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
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

export default ToDoList;
