import React from 'react';

function NotFound() {
  return (
    <div className="flex-container h-[100vh]">
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1">
            4
          </span>
          <span className="fade-in" id="digit2">
            0
          </span>
          <span className="fade-in" id="digit3">
            4
          </span>
        </h1>
        <h3 className="fadeIn">PAGE NOT FOUND</h3>
        <button type="button" name="button" className="h-fit">
          <a href="/">Return To Home</a>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
