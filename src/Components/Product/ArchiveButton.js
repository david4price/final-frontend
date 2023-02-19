import React from "react";
import "./ArchiveButton.css";

const archiveButton = () => {
  return (
    <div>
      <div className="svg-wrap">
        <svg height="30" width="160">
          <rect className="shape" height="30" width="160"></rect>
        </svg>
        <div className="text">Archive</div>
      </div>
    </div>
  );
};

export default archiveButton;
