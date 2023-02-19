import React from "react";
import "./ArchiveButton.css";

const archiveButton = ({onArchive, productId}) => {
  const handleClick =() => {
    onArchive(productId);
  }
  return (
      <div className="svg-wrap" onClick={handleClick}>
          <svg height="30" width="140">
            <rect className="shape" height="30" width="140"></rect>
          </svg>
        <div className="text">Archive</div>
      </div>
  );
};

export default archiveButton;

// onClick={() => {
//     onArchive(productId)
//   }}
