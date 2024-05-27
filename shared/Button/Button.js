import React from 'react';
import Link from 'next/link';

const Button = ({
  className = 'text-white disabled:cursor-not-allowed',
  translate = '',
  sizeClass = 'py-2.5 px-6 sm:py-4 sm:px-8',
  fontSize = 'text-sm sm:text-base font-medium',
  disabled = false,
  href,
  children,
  type,
  loading,
  onClick = () => {},
}) => {
  const CLASSES = `relative h-12  inline-flex items-center justify-center rounded-md transition-colors ${fontSize} ${sizeClass} ${translate} ${className}`;

  const renderLoading = () => {
    return (
      <svg
        className="-ml-1 mr-3 h-5 w-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
  };

  if (href) {
    return (
      <Link href={href} passHref>
        <Link className={`${CLASSES}`} 
        // onClick={onClick}
        >
          {loading && renderLoading()}
          {children || `This is Link`}
        </Link>
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && renderLoading()}
      {children || `This is Button`}
    </button>
  );
};

export default Button;