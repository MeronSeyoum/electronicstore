import React from 'react';
import Button from 'shared/Button/Button';

const ButtonPrimary = ({ className = '', ...args }) => {
  return (
    <Button
      className={`rounded-md bg-primary text-white hover:bg-primary/80 disabled:bg-opacity-70 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
