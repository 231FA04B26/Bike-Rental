import React from 'react';

const LoadingSpinner = ({ size = 'default', light = false }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 
        ${light 
          ? 'border-white/30 border-t-white' 
          : 'border-blue-200 border-t-blue-600'
        }`}
      />
    </div>
  );
};

export default LoadingSpinner;