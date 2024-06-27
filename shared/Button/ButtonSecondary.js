import React from "react";
import Button from "shared/Button/Button";
import { forwardRef } from "react";

const ButtonSecondary = forwardRef(({ className = "", ...props }, ref) => {
  return <Button className={`${className}`} ref={ref} {...props} />;
});

ButtonSecondary.displayName = 'ButtonSecondary';

export default ButtonSecondary;
