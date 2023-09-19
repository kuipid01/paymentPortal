import React from 'react';
import './loading.scss'; // Import the SCSS stylesheet

function Loading() {
  return (
    <div className="loading-pulse">
      <div className="circle"></div>
    </div>
  );
}

export default Loading;
