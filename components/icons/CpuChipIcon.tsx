import React from 'react';

const CpuChipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5M15.75 21v-1.5M12 4.5v15" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7.5 7.5h9v9h-9z" 
    />
  </svg>
);

export default CpuChipIcon;