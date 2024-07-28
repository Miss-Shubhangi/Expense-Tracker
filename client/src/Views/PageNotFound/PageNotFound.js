import React from 'react';
import './PageNotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <img src="https://cdn.pixabay.com/photo/2022/05/19/08/14/spaceship-7206860_1280.png" alt="Astronaut and Rocket" />
        <h2>OOPS...</h2>
        <p>Something went wrong.</p>
        <p>Sorry, we can't find the page you're looking for.</p>
        <Link to="/" className="go-back-button">Go Back</Link>
      </div>
    </div>
  );
};

export default NotFound;
