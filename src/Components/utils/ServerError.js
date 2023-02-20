import React from "react";
import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div>
      <h1>500 Internal Server Error</h1>
      <p>Sorry, something went wrong on our end.</p>
      <Link to="/">Main Page</Link>
    </div>
  );
};

export default ServerError;
