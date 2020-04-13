import React, { FC } from 'react';
import classnames from 'classnames';

export const Button: FC<ButtonProps> = ({
  children,
  className: passedClassName,
  disabled,
  type = 'submit',
  onClick,
}) => {
  const className = classnames(
    'button',
    disabled && 'disabled',
    passedClassName,
  );

  return (
    <button
      className={ className }
      onClick={ onClick }
      type={ type }
    >
      { children }
    </button>
  );
};

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => any;
  type?: 'submit' | 'button' | 'reset';
}
