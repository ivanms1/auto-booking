import React from 'react';
import styles from './Input.module.css'
import classNames from 'classnames';

type InputProps = {
  className?: string,
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function Input ({ className, ...props }: InputProps) {
  
  return (
    <input className={classNames(styles.input, className)} {...props}/>
  )
}



export default Input