import React from 'react';

const GooglePayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.38 9.24h-3.96v5.51h3.96c2.05 0 3.72-1.68 3.72-3.72s-1.67-1.79-3.72-1.79zm0-2.67c3.74 0 6.79 3.04 6.79 6.79s-3.05 6.79-6.79 6.79h-3.96V3.58h3.96c3.74 0 6.79 3.04 6.79 6.79z" />
    <path d="M12.75 3.58v16.84H9.92c-3.74 0-6.79-3.04-6.79-6.79s3.05-6.79 6.79-6.79h2.83z" />
  </svg>
);

export default GooglePayIcon;