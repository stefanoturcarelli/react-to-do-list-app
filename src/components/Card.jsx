import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function Card() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-icon-background">
          <FontAwesomeIcon icon={faClock} />
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
