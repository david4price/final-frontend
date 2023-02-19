import React from "react";
import "./ArchiveButton.css";

const archiveButton = ({onArchive, productId}) => {
  const handleClick =() => {
    console.log("SVG clicked!", productId);
    onArchive(productId);
  }
  return (
      <div className="svg-wrap" onClick={handleClick}>
          <svg height="30" width="160">
            <rect className="shape" height="30" width="160"></rect>
          </svg>
        <div className="text">Archive</div>
      </div>
  );
};

export default archiveButton;

// onClick={() => {
//     onArchive(productId)
//   }}
