const React = require('react');

const Input = (props, ref) => {
  const {
    className = '',
    sizeClass = 'h-9 px-6 py-3',
    fontClass = 'text-xs font-normal',
    rounded = 'rounded-sm',
    type = 'text',
    ...args
  } = props;

  return React.createElement('input', {
    ref: ref,
    type: type,
    className: `block w-full border focus:ring focus:ring-transparent focus:ring-opacity-25 disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`,
    ...args
  });
};

module.exports = React.forwardRef(Input);
