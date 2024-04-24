import React from 'react';
import styles from './Input.module.css'
import classNames from 'classnames';

type InputProps = {
  className?: string,
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input ref={ref} className={classNames(styles.input, className)} {...props}/>
  );
});



export default Input