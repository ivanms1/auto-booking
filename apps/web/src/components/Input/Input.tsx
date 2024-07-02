import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';

type InputProps = {
  className?: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={classNames(styles.input, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
