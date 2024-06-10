import React, { useState, useEffect } from "react";
import {
  faClock,
  faBell,
  faEllipsisVertical,
  faStopwatch,
  faList,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";

function Summary() {
  // Count all tasks and display the count in the card
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    }
  }, []); // Add an empty dependency array here

  return (
    <>
      <div className="container">
        <div className="header-container">
          <div>
            <h2>Hello Jack,</h2>
            <p>You have work today</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
        </div>
        <div className="card-section">
          <Card icon={faClock} status="Today" count={1} />
          <Card icon={faStopwatch} status="Scheduled" count={1} />
          <Card icon={faList} status="All Tasks" count={tasks.length} />
          <Card icon={faCircleExclamation} status="Overdue" count={1} />
        </div>
      </div>
    </>
  );
}

export default Summary;
