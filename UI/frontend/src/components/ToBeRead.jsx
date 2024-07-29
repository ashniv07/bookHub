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
          padding: '14px 25px', 
          fontSize: '15px',
          fontWeight:'bold', 
          transition: 'all 0.3s ease', 
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
