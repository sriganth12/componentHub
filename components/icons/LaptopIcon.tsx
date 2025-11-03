import React from 'react';

const LaptopIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17h4.5M3 13.5v-6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v6m-18 0l-1.5 3h21l-1.5-3m-18 0h18" />
  </svg>
);

export default LaptopIcon;