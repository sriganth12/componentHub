import React from 'react';

const ChatAlt2Icon: React.FC<{ className?: string }> = ({ className }) => (
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
      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-1H9a2 2 0 00-2 2v8a2 2 0 002 2h4l4 4V10a2 2 0 00-2-2z" 
    />
  </svg>
);

export default ChatAlt2Icon;