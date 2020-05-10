import React, { FC } from 'react';
import classnames from 'classnames';

export const Spinner: FC<SpinnerProps> = ({
  visible = true,
  className: passedClassName,
  type = 'light',
}) => {
  const className = classnames(
    'spinner',
    visible && 'visible',
    passedClassName,
  );

  const backgroundStyle = {
    background: `rgba(${type === 'light' ? '255,255,255' : '0,0,0'}, 0.7)`,
  };

  return (
    <div className={ className } style={ backgroundStyle }>
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" />
      </svg>
    </div>
  );
};

interface SpinnerProps {
  visible?: boolean;
  className?: string;
  type?: 'light' | 'dark';
}
