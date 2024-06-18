import React from 'react';

const Textarea = React.forwardRef(
  function Textarea({ className = '', children, rows = 4, ...args }, ref) {
    return (
      <textarea
        ref={ref}
        className={`block w-full rounded-lg focus:ring focus:ring-transparent focus:ring-opacity-25 disabled:bg-neutral-800 ${className}`}
        rows={rows}
        {...args}
      >
        {children}
      </textarea>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
