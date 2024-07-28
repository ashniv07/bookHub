import React from 'react';

const ToBeRead = () => {
  const gradientStart = 'rgb(50, 25, 79)';
  const gradientEnd = 'rgb(122, 101, 149)';

  return (
    <div>
      <button
        className="btn"
        style={{
          borderColor: gradientStart,
          color: gradientStart,
          backgroundColor: 'white',
          borderWidth: '2px',
          padding: '5px 10px', // Smaller padding for a smaller button
          fontSize: '14px', // Smaller font size
          transition: 'all 0.3s ease', // Smooth transition for hover effect
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = gradientStart;
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.color = gradientStart;
        }}
      >
        To be Read
      </button>
    </div>
  );
};

export default ToBeRead;
