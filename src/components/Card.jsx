import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faStopwatch,
  faList,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-icon-background">
          <FontAwesomeIcon icon={props.icon} />
        </div>
      </div>
      <div className="card-body">
        <span>Today</span>
        <span>6</span>
      </div>
    </div>
  );
}

export default Card;
