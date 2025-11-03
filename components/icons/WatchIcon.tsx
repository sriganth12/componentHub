import React from 'react';

const WatchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h10a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17v3a1 1 0 001 1h8a1 1 0 001-1v-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7V4a1 1 0 011-1h8a1 1 0 011 1v3" />
    </svg>
);

export default WatchIcon;