import React from 'react';
import styles from './Input.module.css'
import classNames from 'classnames';

type InputProps = {
  className?: string,
  placeholder?: string
}
function Input ({ className, placeholder = '' }: InputProps) {
  
  return (
    <input className={classNames(styles.input, className)} placeholder={placeholder}/>
  )
}



export default Input