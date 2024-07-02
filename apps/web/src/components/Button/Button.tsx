import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

type ButtonProps = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'dark'
    | 'danger'
    | 'warning'
    | 'light';
  outline?: boolean;
  size?: 'md' | 'lg';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  variant = 'primary',
  outline = false,
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        { [styles.outline]: outline },
        className
      )}
      type='button'
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
