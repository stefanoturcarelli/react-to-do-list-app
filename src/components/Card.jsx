import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-icon-background">
          <FontAwesomeIcon icon={props.icon} />
        </div>
      </div>
      <div className="card-body">
        <span>{props.status}</span>
        <span>{props.count}</span>
      </div>
    </div>
  );
}

export default Card;
