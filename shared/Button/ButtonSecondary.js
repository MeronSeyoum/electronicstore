import React from "react";
import Button from "shared/Button/Button";

const ButtonSecondary = ({ className = "", ...args }) => {
  return <Button className={`${className} `} {...args} />;
};

export default ButtonSecondary;
