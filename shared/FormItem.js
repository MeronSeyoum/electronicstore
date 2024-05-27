import React from 'react';

const FormItem = ({
  children,
  className = '',
  label,
  desc,
}) => {
  return (
    <div className={className}>
      {label && <div className="font-medium text-sm text-gray-500">{label}</div>}
      <div className="mt-1">{children}</div>
      {desc && <div className="mt-1 block text-neutral-300 ">{desc}</div>}
    </div>
  );
};

export default FormItem;
