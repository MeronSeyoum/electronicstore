import React from 'react';

const Checkbox = ({
  subLabel = '',
  label = '',
  name,
  className = '',
  sizeClassName = 'w-4 h-4',
  labelClassName = '',
  defaultChecked,
  onChange,
}) => {
  return (
    <div className={`flex text-xs sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={`focus:ring-action-primary hover:border-neutral-700 rounded border-neutral-400 bg-transparent text-primary  focus:ring-primary ${sizeClassName}`}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <div className="flex flex-1 select-none flex-col justify-center pl-2 sm:pl-3.5">
          <span className={`${labelClassName} ${subLabel ? '-mt-1' : ''}`}>
            {label}
          </span>
          {subLabel && (
            <p className="mt-0.5 text-sm font-light text-neutral-500">
              {subLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
