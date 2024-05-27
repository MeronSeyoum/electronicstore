import React from 'react';

const ProgressBar = ({ value }) => {
  return (
    <div className="relative flex h-2 w-full overflow-hidden rounded-full bg-neutral-300">
      <div style={{ width: `${value}%` }} className="flex h-full bg-primary" />
    </div>
  );
};

export default ProgressBar;
