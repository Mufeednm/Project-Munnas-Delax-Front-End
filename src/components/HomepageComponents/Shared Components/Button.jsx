import React from 'react';

function Button({ children, href, onClick, className = "" }) {
  const baseClasses = "inline-block px-6 py-3 bg-blue-700 text-white rounded hover:bg-yellow-500 hover:-translate-y-1 transition-all duration-300";
  
  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {children}
      </a>
    );
  }
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;