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
          <Card icon={faClock} />
          <Card icon={faStopwatch} />
          <Card icon={faList} />
          <Card icon={faCircleExclamation} />
        </div>
      </div>
    </>
  );
}

export default Summary;
